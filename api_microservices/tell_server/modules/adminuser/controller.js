const AdminUser = require('./model');
const JWT = require('../../services/jwt');

//create admin
const create = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password
        } = req.body;

        let email_clear = email.toLowerCase();
        email_clear = email_clear.trim();

        const newAdminUser = new AdminUser();
        newAdminUser.fullname = fullname;
        newAdminUser.email = email_clear;
        newAdminUser.password = newAdminUser.generateHash(password);

        return res.status(201).json({error:false, message: 'succes create admin acc', contents: await newAdminUser.save()});
    }
    catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

//user signin
const signin = async (req, res) => {
    try {
        const {password} = req.body;
        let {email} = req.body;

        email = email.toLowerCase();
        email = email.trim();

        const NewAdminUser = new AdminUser();

        const dataAdminUser = await AdminUser.findOne({email: email}, (err, admin) => {
            if(err) {
                return {error: true, message: err.message}
            }

            if(!admin || typeof(admin) ===  null) {
                return { error:true, message:'User not Found'}
            }

            return admin;
        });

        let login = false;

        if(dataAdminUser) {
            login =  await NewAdminUser.validPassword(password, dataAdminUser.password);
        }

        if(login) {
            const admin = {
                role: dataAdminUser.role,
                signUpDate: dataAdminUser.signUpDate,
                _id: dataAdminUser._id,
                fullname: dataAdminUser.fullname,
                email: dataAdminUser.email
            }

            admin.token = JWT.sign(admin);
            req.session.admin = admin;

            await req.session.save();

            return res.status(200).json({error:false, user: admin});
        }

        return res.status(403).json({error: true, details:[{message: 'username atau password salah'}]});
        
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const session = async (req, res) => {
    try {
        if(req.session && req.session.admin) {
            const admin = req.session.admin;

            await JWT.verifyManual(admin.token);

            return res.status(200).json({error:false , admin, message:"Sukses"});
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
        
        return res.status(200).json({error:false, message: 'Logout Sukses'});
    }
    catch (err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

exports.signin = signin;
exports.create = create;
exports.session = session;
exports.sessionDestroy = sessionDestroy;
