'use strict'

const Joi = require('joi');
const custom = require('../../services/joiCustomMessage');

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

exports.getContentsByCategory = getContentsByCategory;
exports.search = search;
exports.create = create;