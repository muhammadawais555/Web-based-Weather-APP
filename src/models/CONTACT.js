const mongoose = require("mongoose");

const registerSchema2 = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    }
})
const Cont = new mongoose.model("Cont" , registerSchema2);
module.exports = Cont;