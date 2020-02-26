const User = require('../model');
const UserSession = require('../userSession');

const logoutUser = async(req,res,next) => {
    try {
        const destroy = await req.session.destroy((err) => err);

        if(destroy && destroy.user) {
            delete destroy.user.token;
            return res.status(200).json({error:false, message: 'Logout Sukses'});
        }

        return res.status(500).json({error: true, message: 'Anda Tidak Login'});

        // const { query } = req;
        // const { token } = query;


        // UserSession.findOneAndUpdate({
        //     _id:token,
        //     isDeleted: false
        // }, {
        //     $set:{
        //         isDeleted: true,
        //         logoutTime: new Date()
        //     }
        // },null,(err,sessions)=>{
        //     if(err){
        //         return res.status(500).json({error:true, message:err.message});
        //     }

        //     return res.status(200).json({error: false, message: 'Succes Log Out'})
        // })

    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    };
    
}

exports.logoutUser = logoutUser;