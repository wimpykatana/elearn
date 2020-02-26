'use strict'

const User = require('./model');
const JWT = require('../../services/jwt');
const moment = require('moment');
const fs = require('fs');

const create = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password
        } = req.body;

        let email_clear = email.toLowerCase();
        email_clear = email_clear.trim();

        const newUser = new User();
        newUser.fullname = fullname;
        newUser.email = email_clear;
        newUser.password = newUser.generateHash(password);

        return res.status(201).json({message: 'succes', contents: await newUser.save()});
    }
    catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

const signin = async (req, res) => {
    try {
        const {password} = req.body;
        const {username} = req.body;

        let email = username.toLowerCase();
        email = email.trim();

        const NewUser = new User();

        const dataUser = await User.findOne({email: email}, (err, user) => {
            if(err) {
                return {error: true, message: err.message}
            }

            if(!user || typeof(user) ===  null) {
                return { error:true, message:'The Email or Password Incorrect'}
            }

            if(moment().isSameOrAfter(user.expire_date)) {
                return { error:true, message:'Account Expired already'}
            };

            return user;
        });

        let login = false;

        if(dataUser) {
            login =  await NewUser.validPassword(password, dataUser.password);
        }

        if(login) {
            const user = {
                role: dataUser.role,
                signUpDate: dataUser.signUpDate,
                _id: dataUser._id,
                fullname: dataUser.fullname,
                email: dataUser.email,
                signin_date: Date.now()
            }

            user.token = JWT.sign(user);

            // set variable user to session
            req.session.user = user;

            await req.session.save();

            delete user.signin_date;

            return res.status(200).json({error:false, user: {message: 'Login berhasil'}});
        }

        return res.status(403).json({error: true, details:[{message: 'The Email or Password Incorrect'}]});
        
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const list = async (req, res) => {
    try {
        const users = await User.find({}, '-password -expire_date', (err, users) => {
            if(err) {
                return res.status(400).json({error:true, err});
            }

            return res.status(200).json({error:false, data: users});
        });
    }
    catch (err) {
        return res.status(500).json({error:true, err});
    }
    
}

const upload = async (req, res) => {
    try {
        let uploadFile = req.files.file;
        let datereq = Math.floor(Date.now());

        uploadFile.mv(`/usr/src/app/public/video/${datereq+"-"+uploadFile.name}`, (err) => {

                if (err) {
                    return res.status(500).json({error:true, message:err})
                }

                return res.status(200).json({
                    error: false,
                    message: 'succes',
                    file: `${datereq+"-"+uploadFile.name}`,
                })
            },
        );
    }
    catch(err){
        return res.status(500).json({error:true ,message:err.message});
    }
}

const session = async (req, res) => {
    try {
        if(req.session && req.session.user) {
            const user = req.session.user;

            await JWT.verifyManual(user.token);

            return res.status(200).json({error:false , user, message:"Sukses"});
        }

        return res.status(403).json({error:true, message: "Anda belum login"});
    }
    catch (err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

const sessionDestroy = async (req, res) => {
    try {
        const destroy = await req.session.destroy((err) => err);

        if(destroy && destroy.user) {
            delete destroy.user.token;
            return res.status(200).json({error:false, message: 'Logout Sukses'});
        }

        return res.status(500).json({error: true, message: 'Anda Tidak Login'});
    }
    catch (err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

exports.signin = signin;
exports.create = create;
exports.list = list;
exports.upload = upload;
exports.session = session;
exports.sessionDestroy = sessionDestroy;


