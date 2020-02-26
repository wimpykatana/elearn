const mongoose = require('mongoose');

const EmitenSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
});

EmitenSchema.index({code: "text", name: "text"});

module.exports = mongoose.model("emiten", EmitenSchema);