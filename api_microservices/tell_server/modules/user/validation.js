'use strict'

const Joi = require('joi');
const User = require('./model');
const UserResetPassword = require('./userResetPassword');
const custom = require('../../services/joiCustomMessage');
const moment = require('moment');

const create = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            fullname: Joi.string().min(3).max(30).required().error((errors) => custom.message(errors)),
            password: Joi.string().min(5).required().error((errors) => custom.message(errors)),
            email: Joi.string().email({ minDomainAtoms: 2 }).required().error((errors) => custom.message(errors)),
            newsletter: Joi.boolean().error((errors) => custom.message(errors)),
           // token: (process.env.CAPTCHA_HOST === 'localhost') ? Joi.string() : Joi.string().required().error((errors) => custom.message(errors))
        });

        const valid = await Joi.validate(req.body, schema, (err, value) => {
            if(err) {
                err.status = false
                return err;
            }

            return {status:true, data:{}};
        });

        if(!valid.status) {
            return res.status(500).json(valid.details[0]);
        }

        //check email already exist or not
        const dataUser = await User.find({email: req.body.email}, (err, result) => {
            if(err) {
                return err;
            }

            return result;
        });

        if(dataUser.length > 0) {
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
            email: Joi.string().email({ minDomainAtoms: 2 }).required().error((errors) => custom.message(errors)),
        });

        const valid = await Joi.validate(req.body, schema, (err, value) => {
            if(err) {
                err.status = false;
                return err;
            }

            return {status:true, data:{}};
        });

        if(!valid.status) {
            return res.status(500).json(valid.details[0]);
        }

        return next();
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

const resetpassword = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required().error((errors) => custom.message(errors))
        });

        const valid = await Joi.validate(req.body, schema, (err, value) => {
            if(err) {
                err.status = false;
                return err
            }

            return {status:true, data:{}};
        });

        if(!valid.status) {
            return res.status(500).json(valid.details[0]);
        }

        const dataUser = await User.findOne({email: req.body.email}, {"password":0}, (err, result) => {
            if(err) {
                return err;
            }

            return result;
        });

        if(dataUser) {
            req.body.data = dataUser;
            return next();
        };

        return res.status(200).json({error:true, message: 'Check your email! We just sent a password reset link to your email.'})
    }
    catch(err) {
        return res.status(500).json(err);
    }
}

const checktokenpassword = async(req, res, next) => {
    try {
        const resetdata = await UserResetPassword.findOne({token: req.params.token});

        if(!resetdata) {
            return res.status(404).json({error:true, message: 'This page is not available'})
        }

        if(!resetdata.active) {
            return res.status(403).json({ error:true, message:'This Link is has been used'});
        }

        const a = moment(new Date(), "HH:mm:ss")
        const b = moment(resetdata.createdAt, "HH:mm:ss");

        if(a.diff(b, 'hours') > process.env.EXPIRE_TOKEN_RESET_PASSWORD_H) {
            return res.status(403).json({ error:true, message:'This Link is already expired'});
        }

        req.body.resetdata = resetdata;

        return next();
    }
    catch(err) {
        return res.status(500).json({error:true, message: err.message});
    }
}

const forgetpassword = async(req, res, next) => {
    try {
        const schema = Joi.object().keys({
            resetdata: Joi.object(),
            password: Joi.string().min(5).required().error((errors) => custom.message(errors)),
            password_confirmation: Joi.any().valid(Joi.ref('password')).required().error((errors) => custom.message(errors))
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
    catch(err) {
        return res.status(500).json({error:true, message: err.message});
    }
}

exports.create = create;
exports.signin = signin;
exports.resetpassword = resetpassword;
exports.checktokenpassword = checktokenpassword;
exports.forgetpassword = forgetpassword;
