const User = require('../model');
const UserSession = require('../userSession');

const verifyUser = async (req,res,next) => {
        try{
                const { query } = req;
                const { token } = query;

                UserSession.find({
                        _id: token,
                        isDeleted: false
                },(err,session)=>{
                        if(err){
                                return res.status(500).json({error: true, message: err.message});
                        }

                        if(session.length != 1){
                                return res.status(200).json({error: true, message: 'Invalid Token'});
                        }
                        else{
                                return res.status(200).json({error: false, message: 'logged', value: session[0]});
                        }
                })
        }catch(err){
                return res.status(500).json({error: true, message: err.message});
        }    
}

exports.verifyUser = verifyUser;
