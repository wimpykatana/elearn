var jwt = require('jsonwebtoken');
var moment = require('moment');

const sign = (obj) => {
    const token = jwt.sign(obj, process.env.SECRET_TOKEN);
    
    return token;
}

const verify = async (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).json({error: true, message:'Access denied'});   
    }

    const authorization = req.headers.authorization.split(' ');
    const token = authorization[1];

    await jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
        if(err) {
            return res.status(403).json({error: true, err});
        }

        return next();
    });
} 

const verifyManual = async(token) => {
    await jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
        if(err) {
            return res.status(403).json({error: true, err});
        }

        if (!decoded) {
            return res.status(403).json({error: true, message: 'Token tidak di kenali'});
        }

        //cek for expire token
        if(moment().diff(moment(decoded.signin_date), 'hours') > process.env.ACTIVE_TOKEN_H) {
            req.session.destroy();
            
            return res.status(403).json({error: true, message: 'Token kedaluarsa'});
        }

        return true;
    });
}

exports.sign = sign;
exports.verify = verify;
exports.verifyManual = verifyManual;
