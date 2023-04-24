const Product = require("../models/Product");

const createProduct = (options) => Product.create({ ...options })

const getProducts = () => {
    return {
        displayProducts: Product.find(),
        //return count to use it in frontend later
        count: Product.countDocuments()
    }
}

const getSingleProduct = (id) => Product.findById(id)

const updateProduct = (id, options) => Product.findByIdAndUpdate(id, { ...options }, {
    new: true,
    runValidators: true
})

const deleteProduct = (id) => Product.findByIdAndDelete(id);

const productRepository = { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct }
module.exports = productRepository