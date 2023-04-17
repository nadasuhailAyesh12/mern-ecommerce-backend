const { node_env } = require("../config/enviroment");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");

module.exports = (err, req, res, next) => {
    err.message = err.message || "internal server error";
    err.statusCode = err.statusCode || 500;

    if (node_env == "DEVELOPMENT") {
        console.log(err);

        res.status(err.statusCode).json({
            sucess: false,
            error: err,
            stack: err.stack,
            errorMessage: err.message,
        });
    }
    else if (node_env == "PRODUCTION") {
        if (err.name == "CastError") {
            err = new ErrorHandler(`Resource not found. Invalid :${err.path}`, 400);
        }

        else if (err.name = "validationError") {
            const message = Object.values(err.errors).map(value => value.message);
            err = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            sucess: false,
            message: err.message,
        });
    }
};
