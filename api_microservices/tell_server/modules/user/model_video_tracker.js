/**
 * USER MODEL
 * 
 */

const mongoose = require('mongoose');

const videoTracker = new mongoose.Schema({
    origin: {
        type: String,
        default: ''
    },
    createdAt:{
        type: Date,
        default: ''
    }
});


module.exports = mongoose.model('videoTracker', videoTracker);