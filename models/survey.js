const mongoose = require("mongoose");

var surveySchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
    },
    ownerName : {
        type : String,
        required: true, 
    },
    ownerID :{
        type : String,
        required: true,
    },
    agreeDisagree : {
        type: Array
    },
    shortAnswer :{
        type: Array
    },
    response:{
        type:Array
    }
})

const Survey = new mongoose.model("Survey", surveySchema)
module.exports = Survey