const customApi = require("../errors/customApi");
const { StatusCodes } = require("http-status-codes")

class  BadRequestError extends customApi {
    constructor ( message ){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError;