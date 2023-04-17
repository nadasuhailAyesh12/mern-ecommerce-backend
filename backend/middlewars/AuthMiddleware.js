const AuthHelper = require("../helpers/AuthHelper");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const UserRepository = require("../repositories/userRepository");
const catchAsyncErrors = require("./CatchAsyncErrorsMiddleware");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new ErrorHandler("'Login first to access this resource.", 401)
    }

    const decoded = await AuthHelper.verifyToken(token);
    const { id } = decoded;
    req.user = await UserRepository.getUser({ _id: id });
    next();
})

module.exports = isAuthenticatedUser;