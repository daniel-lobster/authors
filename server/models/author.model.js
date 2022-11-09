const mongoose = require("mongoose")

// DEFINE SCHEMA
const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [
            true,
            "Name is required"
        ],
        minLength: 3
    },
    alive:{
        type:Boolean,
        required: [
            true,
            "Alive is required"
        ]
    },
    description:{
        type:String,
        required: [
            true,
            "Description is required"
        ],
        minLength: 3
    }
}, {timestamps:true});

// REGISTER SHCEMA
const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;