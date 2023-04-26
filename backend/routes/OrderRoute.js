const orderController = require('../controllers/OrderController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewars/AuthMiddleware');
const orderRouter = require('express').Router();

orderRouter.post('/', isAuthenticatedUser, orderController.createOrder);
orderRouter.get("/", isAuthenticatedUser, authorizeRole("Admin"), orderController.getOrders)
orderRouter.get("/me", isAuthenticatedUser, orderController.getLoginUserOrder)
orderRouter.get("/:id", isAuthenticatedUser, orderController.getSpecificOrder)
orderRouter.put("/:id", isAuthenticatedUser, authorizeRole("Admin"), orderController.updateProductstockrelatedToOrder)
orderRouter.delete("/:id", isAuthenticatedUser, authorizeRole("Admin"), orderController.deleteOrder)

module.exports = orderRouter;