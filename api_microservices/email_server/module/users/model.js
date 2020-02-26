'use strict'

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
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
    expire_date: {
        type: Date,
        default: moment().add(process.env.ACTIVE_LOGIN, 'days')
    },
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password, hasPassword) {
    return bcrypt.compareSync(password, hasPassword);
};

module.exports = mongoose.model("User", UserSchema);