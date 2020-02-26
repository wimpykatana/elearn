const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    name:{
        type: String,
        default: ''
    },
    active:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("queueing", ContentSchema);