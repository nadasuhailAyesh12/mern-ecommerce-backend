const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const UserRepository = require("../repositories/userRepository");

const getUsers = async () => {
    const users = await UserRepository.getUsers();

    return users;
}

const getSpecifcUser = async (id) => {
    const user = await UserRepository.getUserByID(id);

    if (!user) {
        throw new ErrorHandler("user not found", 404);
    }

    return user;
}



const UserService = { getUsers, getSpecifcUser }
module.exports = UserService;