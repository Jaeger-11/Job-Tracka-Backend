const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a Name"],
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide a Valid Email"]
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Please Provide a Password"]
    },
    career:{
        type: String
    }
})

userSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function(){
    return jwt.sign({userID:this._id, name:this.username}, process.env.JWT_SECRET, {expiresIn: "20d"})
}

userSchema.methods.checkPassword = async function(passwordGiven){
    const isMatch = await bcrypt.compare(passwordGiven,this.password);
    return isMatch;
}

module.exports = mongoose.model('User', userSchema);