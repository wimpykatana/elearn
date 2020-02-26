const mongoose = require('mongoose');

const SeederSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required : true
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model('Seeder', SeederSchema);