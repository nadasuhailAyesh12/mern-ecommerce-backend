const orderController = require('../controllers/OrderController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewars/AuthMiddleware');
const orderRouter = require('express').Router();

orderRouter.post('/', isAuthenticatedUser, orderController.createOrder);
orderRouter.get("/", isAuthenticatedUser, authorizeRole("Admin"), orderController.getOrders)

module.exports = orderRouter;