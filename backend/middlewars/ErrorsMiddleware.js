const { node_env } = require("../config/enviroment");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");

module.exports = (err, req, res, next) => {
    err.message = err.message || "internal server error";
    err.statusCode = err.statusCode || 500;

    if (node_env == "development") {
        console.log(err);

        res.status(err.statusCode).json({
            sucess: false,
            error: err,
            stack: err.stack,
            errorMessage: err.message,
        });
    }

    else if (node_env === "production" || node_env === "test") {
        if (err.name == "CastError") {
            err = new ErrorHandler(`Resource not found. Invalid :${err.path}`, 400);
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(value => value.message);
            err = new ErrorHandler(message, 400);
        }

        if (err.code === 11000) {
            const message = `duplicate ${Object.keys(err.keyValue)} entered`;
            err = new ErrorHandler(message, 409);
        }

        if (err.name === "JsonWebTokenError") {
            const message = "Json Web Token is invalid.Try Again !!"
            err = new ErrorHandler(message, 400);
        }

        if (err.name === "TokenExpiredError") {
            const message = "Json Web Token is expired"
            err = new ErrorHandler(message, 400);
        }


        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
};
