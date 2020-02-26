'use strict'

const mongoose = require('mongoose');


const EamilHistorySchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    create_date: {
        type: Date,
        default: new Date()
    },
});


module.exports = mongoose.model("EmailHistory", EamilHistorySchema);