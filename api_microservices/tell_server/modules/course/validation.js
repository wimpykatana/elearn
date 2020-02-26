'use strict'

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId// mongoose.Schema.Types.ObjectId;
const Joi = require('joi');
const custom = require('../../services/joiCustomMessage');
const Courses = require('./model');
const User = require('../user/model');

const create = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            title: Joi.string().min(5).max(100).required().error((errors) => custom.message(errors)),
            categoryId: Joi.string().required().error((errors) => custom.message(errors)),
            author: Joi.string().min(5).max(100).required().error((errors) => custom.message(errors)),
            description: Joi.string().min(30).required().error((errors) => custom.message(errors)),
            level: Joi.number().required().error((errors) => custom.message(errors)),
            objective: Joi.string().min(5).required().error((errors) => custom.message(errors)),
            language: Joi.string().min(5)
        });

        await Joi.validate(req.body, schema);

        return next();
    }
    catch(err) {
        return res.status(500).json({error:true, message:err.details[0]});
    }
}

const watched = async (req, res, next) => {
    try {
        if(!ObjectId.isValid(req.params.id)) {//non standart id
            throw {
                message: "Error network, please use other network !"
            }
        }

        if(!ObjectId.isValid(req.body.userId) && req.body.userId) {//non standart id
            throw {
                message: "Error network, please use other network !"
            }
        }

        const course = await Courses.findOne({_id: req.params.id});

        let user = true;

        if(req.body.userId) {
            user = await User.findOne({_id:req.body.userId});
        }
        
        if(course && user) {
            return next();
        }

        throw {
            message: "Access denied !"
        }
        
    } catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

const search = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            search2:  Joi.array().items(),
            search: Joi.string().min(3).required().error((errors) => custom.message(errors))
        });

        await Joi.validate(req.body, schema);

        return next();
    }
    catch(err) {
        return res.status(500).json(err.details[0]);
    }
}

const getContentsByCategory = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            page: Joi.number().required(),
            categoryId: Joi.string().required(),
            data: Joi.string().required()
        });

        await Joi.validate({page:req.query.page, data:req.query.data, categoryId:req.params.categoryid}, schema);

        return next();
    }
    catch(err) {
        return res.status(500).json(err.details[0]);
    }
}

const whatsapp = async (req, res, next) => {
    try {
        const {ops, action} = req.query;
        const arrAction = process.env.WHATSAPP_ACTION.split(",");

        if(!req.query.keyword) {
            req.query.keyword = 'search';
        }

        const schema = Joi.object().keys({
            ops: Joi.string().required(),
            action: Joi.string().required(),
            keyword: Joi.string().required()
        });

        await Joi.validate(req.query, schema);

        if(ops !== process.env.WHATSAPP_OPS) {
            throw {
                details: [{message:"ops not allowed"}]
            }
        }

        if(arrAction.indexOf(action) <= -1){
            throw {
                details: [{message:"ops not allowed"}]
            }
        }

        return next();
    } catch(err) {
        return res.status(500).json(err.details[0]);
    }

    
}

exports.getContentsByCategory = getContentsByCategory;
exports.search = search;
exports.create = create;
exports.watched = watched;
exports.whatsapp = whatsapp