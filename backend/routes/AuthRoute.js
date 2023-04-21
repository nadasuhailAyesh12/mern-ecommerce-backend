const AuthController = require("../controllers/AuthController");
const { isAuthenticatedUser } = require("../middlewars/AuthMiddleware");
const authRouter = require("express").Router();

authRouter.post("/signup", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/logout", AuthController.logout);
authRouter.post("/forgetPassword", AuthController.forgetPassword);
authRouter.put("/resetPassword/:token", AuthController.resetPassword);
authRouter.put("/updatePassword", isAuthenticatedUser, AuthController.updatePassword);

module.exports = authRouter;
