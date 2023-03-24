const ErrorHandler = require("../helpers/ErrorHandler");
const Product = require("../models/Product");
const productRepository = require("../repositories/ProductRepository")

const createProduct = async (body) => {
    // should add user id and image uploding later, authorisation just for admin users
    const product = await productRepository.createProduct(body);
    return product;
}

const getProducts = async () => {
    // this service will be more than just using productRepository,we will pagination,search,filter later
    const products = await productRepository.getProducts()
    return products
}

const getSingleProduct = async (id) => {
    const product = await productRepository.getSingleProduct(id);
    if (!product) {
        throw new ErrorHandler("product not found", 404)
    }
    return product
}

//it will  later contain authosization for admin users only
const updateProduct = async (id, options) => {
    await getSingleProduct(id);
    const product = await productRepository.updateProduct(id, options)
    return product;
}

//it will  later contain authosization for admin users only and also delete images associated with it
const deleteProduct = async (id) => {
    await getSingleProduct(id);
    await productRepository.deleteProduct(id)
}

const productService = { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct }
module.exports = productService;