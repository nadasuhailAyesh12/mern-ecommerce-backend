const UserController = require('../controllers/UserController');
const AuthMiddlewares = require('../middlewars/AuthMiddleware');
const userRouter = require('express').Router();


userRouter.get("/", AuthMiddlewares.isAuthenticatedUser, AuthMiddlewares.authorizeRole('Admin'), UserController.getUsers);
userRouter.get('/me', AuthMiddlewares.isAuthenticatedUser, UserController.getLoginUserProfile)
userRouter.get("/:id", AuthMiddlewares.isAuthenticatedUser, AuthMiddlewares.authorizeRole('Admin'), UserController.getSpecifcUser);
userRouter.put("/:id", AuthMiddlewares.isAuthenticatedUser, AuthMiddlewares.authorizeRole('Admin'), UserController.updateUser);
userRouter.delete("/:id", AuthMiddlewares.isAuthenticatedUser, AuthMiddlewares.authorizeRole('Admin'), UserController.deleteUser);

module.exports = userRouter;