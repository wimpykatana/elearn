var jwt = require('jsonwebtoken');
var moment = require('moment');
const axios = require('axios');
axios.default.withCredentials = true;

const verify = async (req, res, next) => {
    try {
        if(process.env.CAPTCHA_HOST === 'localhost') {
            return next();
        }

        const result = await axios.post(`${process.env.RECAPTCHA_VERIFY_URL}?secret=${process.env.SECRET_RECAPTCHA}&response=${req.body.token}`,{},{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        });

        if(result.data.success) {
            delete req.body.token;
            console.log("========= recaptcha success ========")
            console.log(result.data)
            console.log("========= recaptcha success end========")
            return next();
        }
        
        console.log("========error recaptcha=======");
        console.log(result.data);
        console.log("======== end =======");

        return res.status(403).json({error: true, message:'bad request'});
        
    }
    catch(err) {
        return res.status(403).json(err.response.data);
    }
} 

exports.verify = verify;
