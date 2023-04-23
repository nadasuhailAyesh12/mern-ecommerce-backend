const fs = require("fs");

const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const { UploadPhotoHelper, destroyPhotoHelper } = require("../helpers/UploadPhotoHelper");
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

const uploadProfilePhoto = async (files) => {
    if (files) {
        const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!fileTypes.includes(files.avatar.mimetype)) {
            throw new ErrorHandler("unsupported file format", 400);
        }

        const cloudPhoto = await UploadPhotoHelper(files.avatar.tempFilePath, "avatars");
        const avatar = {
            url: cloudPhoto.secure_url,
            public_id: cloudPhoto.public_id
        }
        fs.unlinkSync(files.avatar.tempFilePath);
        return avatar;
    }
}

const deleteUser = async (id) => {
    const user = await getSpecifcUser(id);
    const avatar_id = user.avatar.public_id;
    destroyPhotoHelper(avatar_id);
    await UserRepository.deleteUser(id);
}

const UserService = { getUsers, getSpecifcUser, updateUser, deleteUser, uploadProfilePhoto }
module.exports = UserService;