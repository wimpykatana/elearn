'use strict'

const Joi = require('joi');
const custom = require('../../services/joiCustomMessage');

const send = async(req, res, next) => {
    try {
        req.body.bcc = (req.body.bcc) ? req.body.bcc : ' ';
        req.body.cc = (req.body.cc) ? req.body.cc : ' ';

        const schema = Joi.object().keys({
            from_title: Joi.string().required(), 
            to: Joi.string().email({ minDomainAtoms: 2 }).required(), 
            subject: Joi.string().required(),
            text: Joi.string(),
            cc: Joi.string(),
            bcc: Joi.string(),
            html: Joi.string().required(),
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
        return res.status(500).json(err);
    }
}
 
exports.send = send;
