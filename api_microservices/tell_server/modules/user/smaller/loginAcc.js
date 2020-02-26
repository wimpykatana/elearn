const User = require('../model');
const JWT = require('../../../services/jwt');

const loginUser = async (req,res,next) =>{
    try {
        const {password} = req.body;
        let {email} = req.body;

        email = email.toLowerCase();
        email = email.trim();

        let user = await User.findOne({email: email}, (err, user) => {
            if(err) {
                return res.status(500).json({error:true, message:err.message});
            }

            if(!user) {
                return res.status(403).json({error:true, message:'Wrong email or password, please try again.'});
            }

            return user;
        });

        let login = null;

        if (user) {
            login = await new User().validPassword(password, user.password);
        }

        if(login) {
            // set var obj for session
            const obj = {
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
            }
            
            obj.token = JWT.sign(obj);
            req.session.user = obj;
            await req.session.save();

            return res.status(200).json({error:false, id:user._id, message:'Login berhasil'});
        }

        return res.status(500).json({error:true, message:'Wrong email or password, please try again.'});
    }
    catch(err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

exports.loginUser = loginUser;