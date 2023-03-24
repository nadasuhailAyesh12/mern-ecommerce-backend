const router = require("express").Router();
const productRouter = require("./productRoute");

router.use("/product", productRouter);
module.exports = router;
