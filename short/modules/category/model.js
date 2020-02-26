/**
 * CATEGORY MODEL
 * 
 */

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        default: ''
    },
    parentId:{
        type: Number,
        default: ''
    },
    description:{
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum : ['main','non-main'],
        default: 'main'
    },
    createdAt: {
        type: Date,
        default: ''
    }
});

module.exports = mongoose.model("Category", CategorySchema);