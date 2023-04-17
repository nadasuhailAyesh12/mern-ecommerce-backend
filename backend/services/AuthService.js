const AuthHelper = require("../helpers/AuthHelper");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");
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

const userService = { register, login };
module.exports = userService;
