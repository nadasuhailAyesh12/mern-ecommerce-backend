const OrderRepository = require("../repositories/OrderRepository");

const createOrder = async (OrderData) => {
    const order = await OrderRepository.createOrder(OrderData);
    return order;
}

const getAllOrders = async () => {
    const orders = await OrderRepository.getOrders();
    return orders;
}

const OrderService = { createOrder, getAllOrders };
module.exports = OrderService;