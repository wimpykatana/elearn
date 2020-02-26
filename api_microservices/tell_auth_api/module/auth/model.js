'use strict'

const mongoose = require('mongoose');

const Auth = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    random: {
        type: String,
        required: true
    },
    signin: {
        type: Date
    },
    ip: {
        type: String
    }
});

module.exports = mongoose.model("Auth", Auth);