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
    const user = await UserService.getSpecifcUser({ _id: req.params.id });

    res.status(200).json({
        success: true,
        user
    })
});

const getUsers = CatchAsyncErrors(async (req, res) => {
    const users = await UserService.getUsers();
    res.status(200).json({
        success: true,
        users
    })
});

const updateUser = async (req, res, next) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body)

        res.status(200).json({
            success: true,
            user
        })
    }
    catch (err) {
        if (err instanceof ErrorHandler) {
            return next(err);
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(value => value.message);
            err = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    }

}
const deleteUser = async (req, res, next) => {
    try {
        await UserService.deleteUser(req.params.id)
        res.status(204).json({
            success: true
        })
    }
    catch (err) {
        if (err instanceof ErrorHandler) {
            return next(err);
        }

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    }

}

const UserController = { getLoginUserProfile, getSpecifcUser, getUsers, updateUser, deleteUser };
module.exports = UserController;
