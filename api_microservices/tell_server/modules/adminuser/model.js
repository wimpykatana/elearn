/**
 * adminuser MODEL
 * 
 */

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// const connection = mongoose.createConnection('mongodb://localhost/tell',{ useNewUrlParser: true })

const AdminUserSchema = new mongoose.Schema({
    fullname:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 1,
        required: true,
        enum: [1, 2, 3]
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    },
});

AdminUserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

AdminUserSchema.methods.validPassword = function(password, hasPassword) {
    return bcrypt.compareSync(password, hasPassword);
};

module.exports = mongoose.model("AdminUser", AdminUserSchema);