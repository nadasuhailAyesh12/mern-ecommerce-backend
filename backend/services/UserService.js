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

const updateUser = async (id, options) => {
    await getSpecifcUser(id);
    const user = await UserRepository.updateUser(id, options)
    return user;
}

const deleteUser = async (id) => {
    //TODO:delete user photo
    await getSpecifcUser(id);
    await UserRepository.deleteUser(id);
}

const UserService = { getUsers, getSpecifcUser, updateUser, deleteUser }
module.exports = UserService;