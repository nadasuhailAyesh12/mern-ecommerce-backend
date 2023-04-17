const AuthHelper = require("../helpers/AuthHelper");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const sendEmail = require("../helpers/SendEmail");
const UserRepository = require("../repositories/userRepository");

const register = async (userData) => {
    const password = await AuthHelper.hashPassword(userData.password);
    userData.password = password;
    const user = await UserRepository.createUser(userData);
    const [token, tokenCookieOptions] = await AuthHelper.generateToken(user._id);
    return { user, token, tokenCookieOptions };
};

const login = async (userData) => {
    const { email, password } = userData;
    const user = await UserRepository.getUser({ email });
    const loginUser = await UserRepository.getUser({ email }).select("+password");

    if (
        user &&
        (await AuthHelper.comparePassword(password, loginUser.password))
    ) {
        const [token, tokenCookieOptions] = await AuthHelper.generateToken(
            user._id
        );
        return { user, token, tokenCookieOptions };
    } else {
        throw new ErrorHandler("invalid login credentials", 401);
    }
};

const forgetPassword = async (email, request) => {
    const user = await UserRepository.getUser({ email });
    if (!user) {
        throw new ErrorHandler("user does not exist", 404)
    }

    const resetToken = await AuthHelper.generateResetPasswordToken(user)

    const resetUrl = `${request.protocol}://${request.get('host')}/api/v1/auth/resetPassword/${resetToken}`
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Shoply password Recovery',
            message
        })
    }
    catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return new ErrorHandler(err.message, 500);
    }
}

const userService = { register, login, forgetPassword };
module.exports = userService;
