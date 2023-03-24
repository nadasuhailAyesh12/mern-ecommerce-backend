const productService = require("../services/ProductService");
const catchAsyncErrors = require("../middlewars/catchAsyncErrors");

const createProduct = catchAsyncErrors(async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

const getProducts = catchAsyncErrors(async (req, res) => {
    const products = await productService.getProducts();
    res.status(201).json({
        success: true,
        count: products.length,
        products,
    });
});

const getSingleProduct = catchAsyncErrors(async (req, res) => {
    const product = await productService.getSingleProduct(req.params.id);
    res.status(200).json({
        success: true,
        product,
    });
});

const updateProduct = catchAsyncErrors(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
        success: true,
        product,
    });
});

const deleteProduct = catchAsyncErrors(async (req, res) => {
    await productService.deleteProduct(req.params.id);
    res.status(204).json({
        success: true,
    });
});

const productController = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
module.exports = productController;
