/**
 * USER RESET PASSWORD MODEL
 * 
 */

const mongoose = require('mongoose');
const User = require('./model');

const UserResetPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    token:{
        type: String,
    },
    createdAt: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('UserResetPassword', UserResetPasswordSchema);