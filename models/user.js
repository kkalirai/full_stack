const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true, 
    },
    survey:{
        type: Array,
        required: false
    },
    password : {
        type : String,
        required: true
    }
})

const User = new mongoose.model("User", userSchema)
module.exports = User