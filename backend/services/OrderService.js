const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const OrderRepository = require("../repositories/OrderRepository");
const productService = require("./ProductService");

const createOrder = async (OrderData) => {
    const order = await OrderRepository.createOrder(OrderData);
    return order;
}

const getAllOrders = async () => {
    const orders = await OrderRepository.getOrders();

    const totalAmount = orders.reduce((totalAmount, item) => {
        return totalAmount + item.totalPrice;
    }, 0)
    return { orders, totalAmount };
}

const getSpecificOrder = async (id) => {
    const order = await OrderRepository.getSpecifcUser(id).populate("user", "name email")
    if (!order) {
        throw new ErrorHandler('Order not found', 404);
    }
    return order;
}

const getLoginedUserOrders = async (user) => {
    const orders = await OrderRepository.getLoginedUserOrders(user)

    return orders;
}

const updateProductstockrelatedToOrder = async (id, status) => {
    const order = await getSpecificOrder(id);

    if (order.orderStatus === "Delivered") {
        throw new ErrorHandler("you have already delivered this order", 400)
    }

    order.orderItems.map(async item => {
        const product = await productService.getSingleProduct(item.product);
        product.stock = product.stock - item.quantity;
        await product.save();
    })

    const updatedOrder = await OrderRepository.updateOrder(id, {
        deliveredAt: Date.now(),
        orderStatus: status
    })
    return updatedOrder;
}

const deleteOrder = async (id) => {
    await getSpecificOrder(id);
    await OrderRepository.deleteOrder(id);
}

const OrderService = { createOrder, getAllOrders, getSpecificOrder, getLoginedUserOrders, updateProductstockrelatedToOrder, deleteOrder };
module.exports = OrderService;