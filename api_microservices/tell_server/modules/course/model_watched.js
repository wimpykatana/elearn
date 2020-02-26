const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conten'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model("Watched", ContentSchema);