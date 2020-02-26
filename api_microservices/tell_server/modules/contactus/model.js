const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    who: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    fullname:{
        type: String,
        required: true
    },
    hp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ph: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model("Contactus", ContactUsSchema);