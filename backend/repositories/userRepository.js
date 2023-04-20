const User = require("../models/User");

const createUser = (options) => User.create(options);

const getUser = (options) => User.findOne({ ...options });

const getUserByID = (id) => User.findById(id);

const getUsers = () => User.find();


const UserRepository = { createUser, getUser, getUserByID, getUsers };
module.exports = UserRepository