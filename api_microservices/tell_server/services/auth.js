var jwt = require('jsonwebtoken');
var moment = require('moment');
const axios = require('axios');
axios.default.withCredentials = true;

const verify = async (req, res, next) => {
    try {
        if(process.env.NODE_ENV !== 'production'){
            return next();
        }

        if(!req.headers.authorization) {
            return res.status(403).json({error: true, message:'Access denied'});   
        }

        const authorization = req.headers.authorization.split(' ');
        const dataBearer = authorization[1];

        const token = await axios.get(process.env.HTTP_AUTH, {
            withCredentials:true,
            headers: {
                authorization: 'Bearer '+dataBearer
            }
        });

        if(token.status) {
            return next();
        }

        return res.status(403).json({error: true, message:token.message});
        
    }
    catch(err) {
        return res.status(403).json(err.response.data);
    }
} 

exports.verify = verify;
