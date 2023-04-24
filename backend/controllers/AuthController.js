const AuthService = require("../services/AuthService");
const { expiresTime } = require("../config/enviroment").cookieConfig;
const UserService = require("../services/UserService");

const register = async (req, res, next) => {
    try {
        req.body.avatar = await UserService.uploadProfilePhoto(req.files);
        const { user, token, tokenCookieOptions } = await AuthService.register(
            req.body
        );

        res.cookie("token", token, tokenCookieOptions);

        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (err) {
        return next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { user, token, tokenCookieOptions } = await AuthService.login(
            req.body
        );

        res.cookie("token", token, tokenCookieOptions);

        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (err) {
        return next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            expires: new Date(Date.now() + expiresTime * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
        });

    }
    catch (err) {
        next(err);
    }
};

const forgetPassword = async (req, res, next) => {
    try {
        await AuthService.forgetPassword(req.body.email, req);

        res.status(200).json({
            success: true,
            message: `Email sent to ${req.body.email}`,
        });

    }
    catch (err) {
        return next(err);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;
        const { token } = req.params;

        await AuthService.resetPassword(password, confirmPassword, token);

        res.status(200).json({
            success: true,
        });

    }
    catch (err) {
        return next(err);
    }
};

const updatePassword = async (req, res, next) => {
    try {
        await AuthService.updatePassword(
            req.body.oldPassword,
            req.body.newPassword,
            req.user._id
        );

        res.status(200).json({
            success: true,
        });

    }
    catch (err) {
        return next(err);
    }
};

const AuthController = {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    updatePassword,
};
module.exports = AuthController;
