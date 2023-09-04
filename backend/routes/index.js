const router = require("express").Router();
const authRouter = require("./AuthRoute");
const orderRouter = require("./OrderRoute");
const paymentRouter = require("./PaymentRoute");
const userRouter = require("./UserRoute");
const productRouter = require("./productRoute");

router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);

module.exports = router;
