'use strict'

const moment = require('moment');
const jwt = require('jsonwebtoken');

const Auth = require('./model.js');
const token = async (req, res) => {
    try {
        const data = {
            random: req.session.id,
            id: req.headers.id,
            signin: new Date()
        }

        let ip = req.connection.remoteAddress;

        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7);
        }

        const auth = await Auth.findOneAndUpdate({random: req.session.id}, {$set:{signin:new Date(), ip: ip}},  { upsert: true, new: true, setDefaultsOnInsert: true });

        const id = jwt.sign(data, process.env.SECRET_TOKEN);

        return res.status(200).json({error:false, token:id});
    }
    catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

const signin =  async(req,res) => {
    try {
        const authorization = req.headers.authorization.split(' ');
        const token = authorization[1];

        const auth = await jwt.verify(token, process.env.SECRET_TOKEN);

        const data = await Auth.findOne({random:auth.random}).sort('-signin');

        if(!data) {
            return res.status(403).json({status:false, message:'user not have access'});
        }

        if(moment().diff(moment(data.signin), 'minutes') > 1) {
            return res.status(403).json({status: false, message: 'user expires'});
        }

        return res.status(200).json({status:true, message:'success'});
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
    
}

exports.signin = signin;
exports.token = token;