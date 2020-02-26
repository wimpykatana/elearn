'use strict'

const mongoose = require('mongoose');

const Emiten = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model("Emiten", Emiten);