const CatchAsyncErrors = require("../middlewars/CatchAsyncErrorsMiddleware");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const UserService = require("../services/UserService");

const getLoginUserProfile = CatchAsyncErrors(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
});

const getSpecifcUser = CatchAsyncErrors(async (req, res) => {
    console.log(req.params.id)
    const user = await UserService.getSpecifcUser({ _id: req.params.id });

    res.status(200).json({
        success: true,
        user
    })
});

const getUsers = CatchAsyncErrors(async (req, res) => {
    const users = await UserService.getUsers();
    console.log(users);
    res.status(200).json({
        success: true,
        users
    })
});


const UserController = { getLoginUserProfile, getSpecifcUser, getUsers };
module.exports = UserController;
