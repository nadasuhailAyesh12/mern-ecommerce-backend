const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const OrderService = require("../services/OrderService");

const createOrder = async (req, res, next) => {
    try {
        req.body.user = req.user._id;
        const order = await OrderService.createOrder(req.body);
        res.status(201).json({
            success: true,
            order
        })
    }
    catch (err) {
        if (err instanceof ErrorHandler) {
            return next(err);
        }

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            err = new ErrorHandler(message, 400);
        }

        res.status(err.status || 500).json({
            success: false,
            message: err.message
        })
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json({
            success: true,
            orders
        })
    }
    catch (err) {
        if (err instanceof ErrorHandler) {
            return next(err);
        }

        res.status(err.status || 500).json({
            success: false,
            message: err.message
        })
    }
};

const orderController = { createOrder, getOrders }
module.exports = orderController
