const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String,
        required : true
    }

})
const Signup = new mongoose.model("Signup" , registerSchema);
module.exports = Signup;