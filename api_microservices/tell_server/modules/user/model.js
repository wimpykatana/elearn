/**
 * USER MODEL
 * 
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    confirm_email: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: ''
    },
    source: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    newsletter:{
        type: Boolean,
        default: false
    },
    signUpDate: {
        type: Date,
        //default: Date.now()
    },
    headline:{
        // field buat jabatan / posisi
        type: String,
        default: ''
    },
    aboutUser:{
        // field buat about user
        type: String,
        default: ''
    },
    language:{
        // field bahasa
        type: String,
        default: 'Indonesia'
    },
    languageId:{
        // field id bahasa
        type: Number,
        default: '1'
    },
    linkPersonalWeb:{
        type: String,
        default: ''
    },
    facebookLink:{
        type: String,
        default: ''
    },
    youtubeLink:{
        type: String,
        default: ''
    },
    linkedinLink:{
        type: String,
        default: ''
    },
    provider:{
        type: String,
        default: ''
    },
    provider_id:{
        type: String,
        default: ''
    },
    provider_pic:{
        type: String,
        default: ''
    },
    token:{
        type: String,
        default: ''
    },
    dob:{
        //date of birth (tanggal lahir)
        type: Date,
        default: ''
    }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password, has) {
  return bcrypt.compareSync(password, has);
};

module.exports = mongoose.model('User', UserSchema);