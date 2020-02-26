'use strict'

const Joi = require('joi');
const AdminUser = require('./model');
const custom = require('../../services/joiCustomMessage');

const create = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            fullname: Joi.string().min(3).max(30).required(),
            password: Joi.string().min(5).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            role: Joi.string().valid('1', '2', '3'),
        });

        const valid = await Joi.validate(req.body, schema, (err, value) => {
            if(err) {
                return {status:false, data: err};
            }

            return {status:true, data:{}};
        });

        if(!valid.status) {
            return res.status(500).json(valid.data);
        }

        const dataAdminUser = await AdminUser.find({email: req.body.email}, (err, result) => {
            if(err) {
                return err;
            }

            return result;
        });

        if(dataAdminUser.length > 0) {
            return res.status(500).json({error:true, message: 'Email already exist.'})
        };

        return next();
    }
    catch(err) {
        return res.status(500).json(err);
    }
}

const signin = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            password: Joi.string().min(5).required().error((errors) => custom.message(errors)),
            username: Joi.string().email({ minDomainAtoms: 2 }).required().error((errors) => custom.message(errors)),
        });

        const valid = await Joi.validate(req.body, schema, (err, value) => {
            if(err) {
                return {status:false, data: err};
            }

            return {status:true, data:{}};
        });

        

        if(!valid.status) {
            return res.status(500).json(valid.data);
        }

        return next();
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

const upload = async(req, res, next) => {
    
}
 
exports.create = create;
exports.signin = signin;