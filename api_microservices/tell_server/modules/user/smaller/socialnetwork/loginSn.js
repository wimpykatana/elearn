const User = require('../../model');
const UserSession = require('../../userSession');
const JWT = require('../../../../services/jwt')

//login SN
const loginSocialNetwork = async(req,res,next) => {
    try{
        // name,email, provider, provider_id, token, provider_pic
        let {name} = req.body;
        let {email} = req.body;
        let {provider} = req.body;
        let {provider_id} = req.body;
        let {token} = req.body;
        let {user_pic} = req.body;
        let obj;

        email = email.toLowerCase();
        email = email.trim();

        let login = null;
        let user = await User.findOne({email: email})
       
        if(!user) {
            const user2 = await User.create({
                email: email,
                fullname:name,
                provider: provider,
                provider_id : provider_id,
                token: token,
                user_pic: user_pic,
            })
                
            obj = {
                fullname: user.fullname,
                email: user.email,
                isDeleted: user.isDeleted,
                newsletter: user.newsletter,
                signUpDate: user.signUpDate,
                headline: user.headline,
                aboutUser: user.aboutUser,
                language: user.language,
                languageId: user.languageId,
                linkPersonalWeb: user.linkPersonalWeb,
                facebookLink: user.facebookLink,
                youtubeLink: user.youtubeLink,
                linkedinLink: user.linkedinLink,
                dob: user.dob,
                _id: user._id,
                source: user.source,
                token_sosmed: user.token
            }
                        
            obj.token = JWT.sign(obj);
            req.session.user = obj;
            await req.session.save();
        }

        if(user){
            await User.findOneAndUpdate({email:email},{
                $set:{
                    email: email,
                    fullname: name,
                    provider: provider,
                    provider_id: provider_id,
                    token: token,
                    user_pic: user_pic
                }
            })

            const user = await User.findOne({email: email, isDeleted:false });

            if(user) {
                // set var obj for session
                obj = {
                    fullname: user.fullname,
                    email: user.email,
                    isDeleted: user.isDeleted,
                    newsletter: user.newsletter,
                    signUpDate: user.signUpDate,
                    headline: user.headline,
                    aboutUser: user.aboutUser,
                    language: user.language,
                    languageId: user.languageId,
                    linkPersonalWeb: user.linkPersonalWeb,
                    facebookLink: user.facebookLink,
                    youtubeLink: user.youtubeLink,
                    linkedinLink: user.linkedinLink,
                    dob: user.dob,
                    _id: user._id,
                    source: user.source,
                    token_sosmed: user.token
                }
                
                obj.token = JWT.sign(obj);
                req.session.user = obj;
                await req.session.save();
            }
        }

        return res.status(200).json({error:false, isLogin: true ,message:'user is login'});
       


    }catch(err){
        return res.status(300).json({error:true, message:err.message});
    }

   

}

//verify  user
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

//logout user
const logoutUser = async(req,res,next) => {
    try {

        const { query } = req;
        const { token } = query;


        UserSession.findOneAndUpdate({
            _id:token,
            isDeleted: false
        }, {
            $set:{
                isDeleted: true,
                logoutTime: new Date()
            }
        },null,(err)=>{
            if(err){
                return res.status(500).json({error:true, message:err.message});
            }

            return res.status(200).json({error: false, message: 'Succes Log Out'})
        })

    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    };
    
}

exports.logoutUser = logoutUser;
exports.verifyUser = verifyUser;
exports.loginSocialNetwork = loginSocialNetwork;