const catchAsyncErrors = require("../middlewars/CatchAsyncErrorsMiddleware");
const AuthService = require("../services/AuthService");
const { expiresTime } = require("../config/enviroment").cookieConfig;
const ErrorHandler = require("../helpers/ErrorHandlerHelper");

const register = async (req, res) => {
    try {
        const { user, token, tokenCookieOptions } = await AuthService.register(
            req.body
        );

        res.cookie("token", token, tokenCookieOptions);

        res.status(201).json({
            success: true,
            user
        });
    }
    catch (err) {
        if (!err instanceof ErrorHandler) {
            return next(err);
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(value => value.message);
            err = new ErrorHandler(message, 400);
        }

        if (err.code === 11000) {
            const message = `duplicate ${Object.keys(err.keyValue)} entered`;
            err = new ErrorHandler(message, 409);
        }

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    }
}

const login = catchAsyncErrors(async (req, res) => {
    const { user, token, tokenCookieOptions } = await AuthService.login(req.body);

    res.cookie("token", token, tokenCookieOptions);
    res.status(200).json({
        success: true,
        user,
    });
});

const logout = catchAsyncErrors(async (req, res) => {
    res.clearCookie("token", {
        expires: new Date(Date.now() + expiresTime * 24 * 60 * 60 * 1000),
        httpOnly: true,
    });
    res.json({
        success: true,
    });
});

const forgetPassword = catchAsyncErrors(async (req, res) => {
    await AuthService.forgetPassword(req.body.email, req)
    res.status(200).json({
        success: true,
        message: `Email sent to ${req.body.email}`
    });
});

const resetPassword = catchAsyncErrors(async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    await AuthService.resetPassword(password, confirmPassword, token);

    res.status(200).json({
        success: true
    });
});

const updatePassword = async (req, res, next) => {
    try {
        await AuthService.updatePassword(req.body.oldPassword, req.body.newPassword, req.user._id);

        res.status(200).json({
            success: true

        })
    }
    catch (err) {
        if (!err instanceof ErrorHandler) {
            return next(err);
        }

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    }
}


const AuthController = { register, login, logout, forgetPassword, resetPassword, updatePassword };
module.exports = AuthController;
