const User = require('../model');
const JWT = require('../../../services/jwt');
const emailSender = require('../../../services/email.js');

const regisUser = async (req, res) => {
    try {
        const {
            fullname,
            password,
            newsletter
        } = req.body;

        let {email} = req.body;

        email = email.toLowerCase();
        email = email.trim();

        //Save user registration
        const UserModel = new User();
        UserModel.email = email;
        UserModel.fullname = fullname;
        UserModel.newsletter = newsletter;
        UserModel.password = UserModel.generateHash(password);
        UserModel.signUpDate = new Date();
        /** CEK EMAIL SUDAH TERDAFTAR ATAU BELUM */
        // User.find({
        //     email: email
        // },(err, previousUsers)=>{
        //     if(err){
        //         return res.status(500).json({error:true, message:err.message});
        //     }else if(previousUsers.length > 0){
        //         return res.status(500).json({error:true, message: 'Email already exist.'})
        //     }

            // //Save user registration
            // const newUser = new User();
            // newUser.email = email;
            // newUser.fullname = fullname;
            // newUser.newsletter = newsletter;
            // newUser.signUpDate = new Date();
            // newUser.password = newUser.generateHash(password);

        const newUser = await UserModel.save();

        const obj = {
            fullname: newUser.fullname,
            email: newUser.email,
            isDeleted: newUser.isDeleted,
            newsletter: newUser.newsletter,
            signUpDate: newUser.signUpDate,
            headline: newUser.headline,
            aboutUser: newUser.aboutUser,
            language: newUser.language,
            languageId: newUser.languageId,
            linkPersonalWeb: newUser.linkPersonalWeb,
            facebookLink: newUser.facebookLink,
            youtubeLink: newUser.youtubeLink,
            linkedinLink: newUser.linkedinLink,
            dob: newUser.dob,
            _id: newUser._id,
        }

         // add to session
         obj.token = JWT.sign(obj);

         req.session.user = obj;
         req.session.save();

         const data = {
             fullname: newUser.fullname,
             link: `${process.env.TELL_CLIENT_HTTP}://${process.env.TELL_CLIENT_HOST}/verifyemail/${newUser.id}`
         }
 
         res.render('email_activation.html', data, function(err, html) {
            if(err) {
                return res.status(200).json({message: 'Render failled', err});
            }

            emailSender.send({
                from: `noreply@tell.co.id <${process.env.EMAIL_SENDER}>`,
                to: newUser.email,
                subject: 'Email Activation',
                text: 'this text',
                html: html
            });

            
            return res.status(200).json({error: false, fullname:newUser.fullname, id: newUser._id, message: 'Sign up Succes'});
        });
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
} /** END OFF REGIS ACCOUNT */

exports.regisUser = regisUser;