const catchAsyncErrors = require("../middlewars/CatchAsyncErrorsMiddleware");
const userService = require("../services/AuthService");

const register = catchAsyncErrors(async (req, res) => {
    const { user, token, tokenCookieOptions } = await userService.register(req.body);
    res.cookie('token', token, tokenCookieOptions)

    res.json({
        success: true,
        user
    });
});

const login = catchAsyncErrors(async (req, res) => {
    const { user, token, tokenCookieOptions } = await userService.login(req.body);

    res.cookie('token', token, tokenCookieOptions);
    res.json({
        success: true,
        user
    });
});

const AuthController = { register, login }
module.exports = AuthController;
