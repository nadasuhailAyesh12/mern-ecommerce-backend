const OrderService = require("../services/OrderService");

const createOrder = async (req, res, next) => {
    try {
        req.body.user = req.user._id;
        const order = await OrderService.createOrder(req.body);

        res.status(201).json({
            success: true,
            order,
        });

    }
    catch (err) {
        return next(err);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const { orders, totalAmount } = await OrderService.getAllOrders();

        res.status(200).json({
            success: true,
            orders,
            totalAmount,
        });

    }
    catch (err) {
        return next(err);
    }
};

const getSpecificOrder = async (req, res, next) => {
    try {
        const order = await OrderService.getSpecificOrder(req.params.id);

        res.status(200).json({
            success: true,
            order,
        });
    }
    catch (err) {
        return next(err);
    }
};

const getLoginUserOrder = async (req, res, next) => {
    try {
        const orders = await OrderService.getLoginedUserOrders(req.user._id);

        res.status(200).json({
            success: true,
            orders,
        });

    }
    catch (err) {
        return next(err);
    }
};

const updateProductstockrelatedToOrder = async (req, res, next) => {
    try {
        const order = await OrderService.updateProductstockrelatedToOrder(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            success: true,
            order,
        });
    }
    catch (err) {
        return next(err);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        await OrderService.deleteOrder(req.params.id);

        res.status(204).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
};

const orderController = {
    createOrder,
    getOrders,
    getSpecificOrder,
    getLoginUserOrder,
    updateProductstockrelatedToOrder,
    deleteOrder,
};
module.exports = orderController;
