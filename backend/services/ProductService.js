const fs = require("fs");

const APIFeatures = require("../helpers/APIFeaturesHelper");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const UploadPhotoHelper = require("../helpers/UploadPhotoHelper");
const productRepository = require("../repositories/ProductRepository")

const createProduct = async (body) => {
    // should add user id later,authorisation just for admin users
    const product = await productRepository.createProduct(body);
    return product;
}

const getProducts = async (requestQuery) => {
    const productsCount = await productRepository.getProducts().count

    const apiFeatures = new APIFeatures(productRepository.getProducts().displayProducts, requestQuery)
        .search()
        .filter()
        .pagination()

    const products = await apiFeatures.query;
    return { products, productsCount }
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

const uploadPhoto = async (files) => {
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!fileTypes.includes(files.image.mimetype)) {
        throw new ErrorHandler("unsupported file format", 400);
    }

    const cloudPhoto = await UploadPhotoHelper(files.image.tempFilePath, "products");
    const image = {
        url: cloudPhoto.secure_url,
        public_id: cloudPhoto.public_id
    }
    fs.unlinkSync(files.image.tempFilePath);
    return image;
}

const productService = { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct, uploadPhoto }
module.exports = productService;