const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");


const Authentication = (req,res,next) => {

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError("Authentication invalid");
    }
    const token =authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userID, username: payload.name}
        next();
    } catch (error) {
        throw new UnAuthenticatedError("Authentication invalid....")
    }
}

module.exports = Authentication;