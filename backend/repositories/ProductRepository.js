const Product = require("../models/Product");

const createProduct = (options) => Product.create({ ...options })

const getProducts = () => Product.find()

const getSingleProduct = (id) => Product.findById(id)

const updateProduct = (id, options) => Product.findByIdAndUpdate(id, { ...options }, {
    new: true,
    runValidators: true
})

const deleteProduct = (id) => Product.findByIdAndDelete(id);

const productRepository = { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct }
module.exports = productRepository