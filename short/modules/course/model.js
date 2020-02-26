/**
 * CONTENT MODEL
 * 
 */

const mongoose = require('mongoose');
const shortid = require('shortid');

const ContentSchema = new mongoose.Schema({
    contributorName:{
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    }, 
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    category:{
        type: Number
    },
    categoryName:{
        type: String,
        default: ''
    },
    subCategory:{
        type: Number,
        default: ''
    },
    subCategoryName:{
        type: String,
        default: ''
    },
    enrolled:{
        type: Number,
        default: 0
    },
    userhasRate:{
        type: Array,
        default:[]
    },
    ratings:{
        type: Array,
        default: []
    },
    rate:{
        type: Array,
        default:[]
        // userHasRate:{
        //     type: String,
        //     default: ''
        // },
        // ratings:{
        //     type: Number,
        //     default: 0
        // },
    },
    uploadDate: {
        type: Date,
        default: Date.now()
    },
    level:{
        type: Number,
        default: 1
    },
    title:{
        type: String,
        default: ''
    },
    description:{
        type: String,
        default: ''
    },
    objective:{
        type: String,
        default: ''
    },
    video:{
        type: String,
        default: ''
    },
    imagePreview:{
        type: String,
        default: ''
    },
    displayImage:{
        type: String,
        default: ''
    },
    language:{
        type: String,
        default: ''
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    timeVideo:{
        type: String,
        default: ''
    },
    shorturl:{
        type: String,
        default: shortid.generate
    }
});

ContentSchema.index({ title: 'text' });

module.exports = mongoose.model("Conten", ContentSchema);