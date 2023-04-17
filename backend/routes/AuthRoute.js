const AuthController = require("../controllers/AuthController");
const authRouter = require("express").Router();

authRouter.post("/signup", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/logout", AuthController.logout);
authRouter.post("/forgetPassword", AuthController.forgetPassword);

module.exports = authRouter;
