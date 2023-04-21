const User = require("../models/User");

const createUser = (options) => User.create(options);

const getUser = (options) => User.findOne({ ...options });

const getUserByID = (id) => User.findById(id);

const getUsers = () => User.find();

const updateUser = (id, options) => User.findByIdAndUpdate(id, options, {
    new: true,
    runValidators: true
});

const deleteUser = (id) => User.findByIdAndDelete(id);

const UserRepository = { createUser, getUser, getUserByID, getUsers, updateUser, deleteUser };
module.exports = UserRepository