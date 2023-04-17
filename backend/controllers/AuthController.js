const catchAsyncErrors = require("../middlewars/CatchAsyncErrorsMiddleware");
const userService = require("../services/AuthService");
const { expiresTime } = require("../config/enviroment").cookieConfig;

const register = catchAsyncErrors(async (req, res) => {
    const { user, token, tokenCookieOptions } = await userService.register(
        req.body
    );

    res.cookie("token", token, tokenCookieOptions);

    res.json({
        success: true,
        user,
    });
});

const login = catchAsyncErrors(async (req, res) => {
    const { user, token, tokenCookieOptions } = await userService.login(req.body);

    res.cookie("token", token, tokenCookieOptions);
    res.json({
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

    await userService.forgetPassword(req.body.email, req)
    res.status(200).json({
        success: true,
        message: `Email sent to ${req.body.email}`
    });
});

const AuthController = { register, login, logout, forgetPassword };
module.exports = AuthController;
