const User = require("../models/User");

const createUser = (options) => User.create(options);
const getUser = (options) => User.findOne({ ...options });

const UserRepository = { createUser, getUser };
module.exports = UserRepository