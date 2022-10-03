const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const { 
    UnAuthenticatedError,
    NotFoundError,
    BadRequestError
} = require("../errors")
require("dotenv").config();


const signUp = async (req,res) => {
    const { username, email, password } = req.body;
    if ( !username || !email || !password ){
        throw new BadRequestError("username, password, email are required")
    }
    const user = await User.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({username:user.username, token})
    
}

const logIn = async (req,res) => {
    const {email, password} = req.body 
    if (!email || !password){
        throw new BadRequestError("email and password are required");
    } 
    const user = await User.findOne({email})
    if(!user){
        throw new UnAuthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await user.checkPassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError("Password Incorrect");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({username:user.username, token})    
}

const editUser = async (req,res) => {
    
} 

module.exports = {
    logIn,
    signUp
}