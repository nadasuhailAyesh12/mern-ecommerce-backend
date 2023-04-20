const UserController = require('../controllers/UserController');
const AuthMiddlewares = require('../middlewars/AuthMiddleware');
const userRouter = require('express').Router();


userRouter.get("/", AuthMiddlewares.isAuthenticatedUser, AuthMiddlewares.authorizeRole('Admin'), UserController.getUsers);
userRouter.get('/me', AuthMiddlewares.isAuthenticatedUser, UserController.getLoginUserProfile)
userRouter.get("/:id", AuthMiddlewares.isAuthenticatedUser, AuthMiddlewares.authorizeRole('Admin'), UserController.getSpecifcUser);

module.exports = userRouter;