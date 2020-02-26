const User = require('./model');
const VideoTracker = require('./model_video_tracker');
const UserResetPassword = require('./userResetPassword');
const regisUserModule = require('./smaller/regisAcc');
const loginUserModule = require('./smaller/loginAcc');
const logoutUserModule = require('./smaller/logoutAcc');
const verifyUserModule = require('./smaller/verifyAcc');
const bcrypt = require('bcrypt');
const JWT = require('../../services/jwt');
const axios = require('axios');
axios.defaults.withCredentials = true;
const email = require('../../services/email');
const enrypt = require('../../services/encrypt');
const loginSocialNetworkModule = require('./smaller/socialnetwork/loginSn');
const Watched = require('../course/model_watched');
const _ = require('underscore');
const videos = require('../../services/populerVideos.js');

//GET ALL USER
const getAllUser = async (req,res,nex) => {
    try{
        let result = await User.find({});
        return res.status(200).json({error:false, users: result})
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

//GET User by ID
const getSingleUser = async (req,res,next) => {
    try{
        const id = String(req.params.id);
        let result = await User.findById(id, { "password":0 });

        return res.status(200).json({error:false, user: result});
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

//update User Profile
const updateUser = async (req,res,next) =>{
    try{

        const { id } = req.body;

        User.findOneAndUpdate({
            _id:id,
        },
        {
            $set: req.body
        },null,(err,sessions)=>{
            if(err){
                return res.status(500).json({error:true, message:err.message});
            }
            return res.status(200).json({error: false, message: "Update User Profile Succes"})
        })

    }catch(err){

        return res.status(500).json({error:true, message: err.message})
    }
}

//change pasw User
const changePaswProfile = async (req,res,next) => {
    try {
        const newUser = new User();
        const { id } = req.body;
        const { password } = req.body;
        const { newPassword }  = req.body;
        const { reNewPassword } = req.body;

        let user = await User.findOne({_id: id}, (err, user) => {
            if(err) {
                return res.status(500).json({error:true, message:err.message});
            }

            return user;

        });

        let validPassword = null;

        if (user) {
            validPassword = await new User().validPassword(password, user.password);
        }

        if(validPassword){
            let compareNewPassword = null;

            if(password === newPassword){
                compareNewPassword = false;

                return res.status(300).json({error:false, message: "Your new password is currently same with the old one"});
            }

            if(newPassword !== reNewPassword){
                compareNewPassword = false;

                return res.status(300).json({error:false, message: "Your new password did not match"});
            }

            compareNewPassword = true;
            const newHashPassword = newUser.generateHash(newPassword);
            const userChagePassword = await User.update({_id: id }, { password: newHashPassword }); //update user password
            // await User.update({_id: id }, { password: newHashPassword }); //update user password


            //begin sending email
            if(userChagePassword) {
                const data2 = {
                    name: user.fullname,
                    email: user.email
                }
    
                res.render('password_has_been_changed.html', data2, function(err, html) {
                    if(err) {
                        return res.status(200).json({message: 'Render failed send email updated', err});
                    }
        
                    email.send({
                        from: `noreply@tell.co.id <${process.env.EMAIL_SENDER}>`,
                        to: user.email,
                        subject: 'Password has been changed',
                        text: 'this text',
                        html: html
                    });
                });
            }

            return res.status(200).json({error:false,validUser:validPassword, message: "Your password has been changed"});
        }

        return res.status(300).json({error: false, message: "Your password is incorrect, please recheck."});

    }catch(err){

        return res.status(500).json({error: true, message: err.message})
    }
}

const me = async (req, res) => {
    try {
        if(req.session && req.session.user) {
            const user = req.session.user;

            await JWT.verifyManual(user.token);

            user.message = "Sukses";
            user.error = false;
            let userNew = await User.findOne({_id:user._id},{"password":0});
            
            const arr = await videos.getWatchingByUser(user._id, 'home');

            const data = {
                recent: {_id: user._id, name: process.env.NAME_CATEGORY_RECENT, courses:arr},
                token: user.token,
                fullname: userNew.fullname,
                email: userNew.email,
                confirm_email: userNew.confirm_email,
                isDeleted: userNew.isDeleted,
                newsletter: userNew.newsletter,
                signUpDate: userNew.signUpDate,
                headline: userNew.headline,
                aboutUser: userNew.aboutUser,
                language: userNew.language,
                languageId: userNew.languageId,
                linkPersonalWeb: userNew.linkPersonalWeb,
                facebookLink: userNew.facebookLink,
                youtubeLink: userNew.youtubeLink,
                linkedinLink: userNew.linkedinLink,
                source:userNew.source,
                token_sosmed: userNew.token_sosmed,
                dob: userNew.dob,
                _id: userNew._id,
                __v: userNew.__v
            }

            let newData = enrypt.create(data);

            return res.status(200).json({data:newData});
        }

        return res.status(403).json({error:true, message: "You don't have access"});
    }
    catch (err) {console.log(err)
        return res.status(500).json({error:true, message: err.message});
    }
}

const resetpassword = async (req, res) => {
    try {
        const user = req.body.data;

        const tokenHash = await generateHash(user._id);
        const resetpass = await UserResetPassword.create({userId: user._id, token: tokenHash, createdAt: new Date()});

        const data = {
            name: user.fullname,
            link: `${process.env.TELL_CLIENT_HTTP}://${process.env.TELL_CLIENT_HOST}/resetpassword/${resetpass.token}`
        }

        res.render('forgot_passwd.html', data, function(err, html) {
            if(err) {
                return res.status(200).json({message: 'Render failled', err});
            }

            email.send({
                from: `noreply@tell.co.id <${process.env.EMAIL_SENDER}>`,
                to: user.email,
                subject: 'Reset Password',
                text: 'this text',
                html: html
            });
        });

        return res.status(200).json({error:false, message: 'Check your email! We just sent a password reset link to your email.', resetpass});
    }
    catch(err) {
        return res.status(500).json({error:true, message: err.message});
    }
}

const checkTokenPassword =  async (req, res) => {
    try {
        return res.status(200).json({error:true, message: 'Token valid'});
    }
    catch(err) {
        return res.status(500).json({error:true, message: err.message});
    }
}

const updatePassword =  async (req, res) => {
    try {
        const newUser = new User();
        const hash = newUser.generateHash(req.body.password);
        const data = req.body.resetdata;

        const userUpdate = await User.update({_id:data.userId}, {password:hash});
        await UserResetPassword.update({_id:data._id}, {active: false});
        const user = await User.findOne({_id:data.userId})

        if(userUpdate) {
            const data2 = {
                name: user.fullname,
                email: user.email
            }

            res.render('password_has_been.html', data2, function(err, html) {
                if(err) {
                    return res.status(200).json({message: 'Render failed send email update', err});
                }
    
                email.send({
                    from: `noreply@tell.co.id <${process.env.EMAIL_SENDER}>`,
                    to: user.email,
                    subject: 'Password has been changed',
                    text: 'this text',
                    html: html
                });
            });
        }

        return res.status(200).json({error:false, message: 'Your password has been reset', update: true});
    }
    catch(err) {
        return res.status(500).json({error:true, message: err.message});
    }
}

function generateHash(userId) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                return reject(err)
            }

            bcrypt.hash(Date.now+userId, salt, function(err, hash) {
                if(err){
                    return reject(err);
                }

                hash = hash.replace(/\//g, '');
                hash = hash.replace(/[?=]/g, '');
                hash = hash.trim();

                return resolve(hash)
            });
        });
    });
}

const videoStream = async(req, res) => {
    const fs = require('fs');
    const path = require('path');

    try {
        const vdo = path.join(__dirname, '../../public/videos/'+req.params.videoname);

        if (!fs.existsSync(vdo)){
            throw {message: "Video not found"};
        }

        const stat = fs.statSync(vdo)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            let end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1

            let chunksize = (end-start)+1;

            if(chunksize > 2000000) {
                const diff = chunksize - 2000000
                end -= diff;
                chunksize = 2000000;
            }

            const file = fs.createReadStream(vdo, {start, end})
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(vdo).pipe(res)
        }

    }catch(err) {
        if(err.code === 'ENOENT') {
            return res.status(500).json({error:true, message: 'File not found'});
        }

        return res.status(500).json({error:true, message: err.message});
    }
}

const videoStreamEmiten = async(req, res) => {
    const fs = require('fs');
    const path = require('path');

    try {
        const filePath = path.join(__dirname, '../../public/videos/'+req.params.emiten + '/'+ req.params.id + '/'+req.params.videoname);

        if (!fs.existsSync(filePath)){
            throw {message: "Video not found"};
        }

        fs.stat(filePath, function (err, stats) {
            var fileExt = filePath.slice(filePath.lastIndexOf('.'));
            fileExt = fileExt && fileExt.toLowerCase() || fileExt;

            switch(fileExt) {
                case '.m3u8':
                    res.status(200).set('Content-Type', 'application/vnd.apple.mpegurl');
                    fs.createReadStream(filePath).pipe(res);
                    break;
                case '.ts':
                    res.status(200).set('Content-Type', 'video/MP2T');
                    fs.createReadStream(filePath).pipe(res);
                    break;
                default:
                    const stat = fs.statSync(filePath)
                    const fileSize = stat.size;
                    const range = req.headers.range;

                    if (range) {
                        const parts = range.replace(/bytes=/, "").split("-")
                        const start = parseInt(parts[0], 10)
                        let end = parts[1]
                        ? parseInt(parts[1], 10)
                        : fileSize-1
            
                        let chunksize = (end-start)+1;
            
                        if(chunksize > 2000000) {
                            const diff = chunksize - 2000000
                            end -= diff;
                            chunksize = 2000000;
                        }
        
                        const file = fs.createReadStream(filePath, {start, end})
                        const head = {
                            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                            'Accept-Ranges': 'bytes',
                            'Content-Length': chunksize,
                            'Content-Type': 'video/mp4',
                        }
            
                        res.writeHead(206, head)
                        file.pipe(res)
                    } else {
                        const head = {
                            'Content-Length': fileSize,
                            'Content-Type': 'video/mp4',
                        }
                        res.writeHead(200, head)
                        fs.createReadStream(filePath).pipe(res)
                    }
            }

        });
    } catch(err) {
        if(err.code === 'ENOENT') {
            return res.status(500).json({error:true, message: 'File not found'});
        }

        return res.status(500).json({error:true, message: err.message});
    }
}

const videoStreamSubFolder = async(req, res) => {
    const fs = require('fs');
    const path = require('path');

    try {
        const vdo = path.join(__dirname, '../../public/videos/'+req.params.subfolder + '/'+req.params.videoname);

        if (!fs.existsSync(vdo)){
            throw {message: "Video not found"};
        }
        
        const stat = fs.statSync(vdo)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            let end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1

            let chunksize = (end-start)+1;

            if(chunksize > 2000000) {
                const diff = chunksize - 2000000
                end -= diff;
                chunksize = 2000000;
            }

            const file = fs.createReadStream(vdo, {start, end})
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(vdo).pipe(res)
        }

        //tracking video use origin
        await VideoTracker.update({origin: req.headers.origin}, {origin: req.headers.origin}, {upsert: true});

    } catch(err) {
        if(err.code === 'ENOENT') {
            return res.status(500).json({error:true, message: 'File not found'});
        }

        return res.status(500).json({error:true, message: err.message});
    }
}

const verifyEmail = async(req, res) => {
    try {
        const update = await User.findOneAndUpdate({_id:req.params.id, confirm_email: false}, {$set: {confirm_email:true}}, {new:true});

        if(update) {
            return res.status(200).json(update);
        }

        throw {
            message: "Verify email invalid"
        }
    }
    catch(err) {
        return res.status(500).json({error:true, message: err.message});
    }
}

//GET Verify User
const verifyUser = verifyUserModule.verifyUser;

//POST Register acc
const regisUser = regisUserModule.regisUser;

//POST LOGIN ACCOUNT
const loginUser = loginUserModule.loginUser;

//GET LOGOUT ACCOUNT
const logoutUser = logoutUserModule.logoutUser;

//Social Network
const loginSocialNetwork = loginSocialNetworkModule.loginSocialNetwork;

exports.verifyEmail = verifyEmail;
exports.getAllUser = getAllUser;
exports.getSingleUser = getSingleUser;
exports.regisUser = regisUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.verifyUser = verifyUser;
exports.me = me;
exports.resetpassword = resetpassword;
exports.checkTokenPassword = checkTokenPassword;
exports.updatePassword = updatePassword;
exports.videoStream = videoStream;
exports.videoStreamEmiten = videoStreamEmiten;
exports.videoStreamSubFolder = videoStreamSubFolder;
exports.updateUser = updateUser;
exports.changePaswProfile = changePaswProfile;
exports.loginSocialNetwork = loginSocialNetwork;
