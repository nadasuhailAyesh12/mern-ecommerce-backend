const router = require("express").Router();
const authRouter = require("./AuthRoute");
const productRouter = require("./productRoute");

router.use("/product", productRouter);
router.use('/auth', authRouter);

module.exports = router;
