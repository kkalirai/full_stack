const mongoose = require("mongoose");


const responseSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    surveyID: {
        type: String,
        required: true
    },
    ownerID: {
        type: String,
        required: true
    },
    responseDate: {
        type: Date,
        default: new Date().toLocaleString('default', { day: "numeric", month: "long", year: "numeric" })
    }
})

const Response = new mongoose.model("Response", responseSchema);
module.exports = Response