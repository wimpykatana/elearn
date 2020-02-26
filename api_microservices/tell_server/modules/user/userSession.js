/**
 * USER SESSION MODEL
 * 
 */

const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    fullname:{
        type: String,
        default: ''
    },
    loginTime: {
        type: Date,
        default: Date.now()
    },
    logoutTime:{
        type: Date,
        default: ''
    },
    token:{
        type: String,
        default: ''
    },
    loginWith:{
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('UserSession', UserSessionSchema);