const customApi = require("../errors/customApi");
const { StatusCodes } = require("http-status-codes")

class  UnAuthenticatedError extends customApi {
    constructor ( message ){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthenticatedError;