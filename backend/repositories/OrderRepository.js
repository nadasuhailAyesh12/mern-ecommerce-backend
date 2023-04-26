const Order = require("../models/Order");

const createOrder = (options) => Order.create(options);

const getOrders = () => Order.find({});

const getSpecifcUser = (id) => Order.findById(id);

const getLoginedUserOrders = (loginedUser) => Order.find({ user: loginedUser })

const updateOrder = (id, options) => Order.findByIdAndUpdate(id, options, {
    new: true,
    runValidators: true
});

const deleteOrder = (id) => Order.findByIdAndDelete(id);

const OrderRepository = { createOrder, getOrders, getSpecifcUser, getLoginedUserOrders, updateOrder, deleteOrder };
module.exports = OrderRepository;