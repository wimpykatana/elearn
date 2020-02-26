'use strict'

const listClient = require('../../config/listClient.js');

const token = async(req, res, next) => {
    try {
        const {id} = req.headers;

        if(!id) {
            return res.status(403).json('user not allowed');
        }
      
        const match = await listClient.find((item) => item === id);

        if(!match) {
            return res.status(403).json('user not allowed');
        }

        return next();
    }
    catch(err) {
        return res.status(500).json(err);
    }
}
 
const signin = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            return res.status(403).json({status:false, message:'user not allowed'});   
        }
        
        const authorization = req.headers.authorization.split(' ');
        const token = authorization[1];

        if(!token) {
            return res.status(403).json({status:false, message:'user not allowed'});
        }
    
        return next();
    }
    catch (error) {
        return res.status(500).json({error:error});
    }
}

exports.signin = signin
exports.token = token;
