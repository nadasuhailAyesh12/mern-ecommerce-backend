const Order = require("../models/Order");

const createOrder = (options) => Order.create(options);

const getOrders = () => Order.find({});

const OrderRepository = { createOrder, getOrders };
module.exports = OrderRepository;