const customApi = require('../errors/customApi');
const { StatusCodes } = require("http-status-codes");

const errorHandler = ( err,req,res,next ) => {
    
    let customError = {
        // set Default
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again!"
    }

    // if (err instanceof customApi){
    //     return res.status(err.statusCode).json({msg: err.message})
    // }
    if (err.code && err.code === 11000){
        customError.msg = "Email already exists, please choose another value"
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
    return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandler;