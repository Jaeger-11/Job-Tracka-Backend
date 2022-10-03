const BadRequestError = require("./badRequestError");
const UnAuthenticatedError = require("./unAuthenticated");
const NotFoundError = require("./notFound");
const CustomAPIError = require("./customApi");

module.exports = { 
    BadRequestError,
    UnAuthenticatedError,
    NotFoundError,
    CustomAPIError
}