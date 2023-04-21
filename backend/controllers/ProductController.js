const productService = require("../services/ProductService");
const catchAsyncErrors = require("../middlewars/CatchAsyncErrorsMiddleware");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");

const createProduct = async (req, res) => {
    try {
        const image = await productService.uploadPhoto(req.files);
        req.body.image = image;
        req.body.user = req.user._id;
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            success: true,
            product,
        })
    }
    catch (err) {
        if (!err instanceof ErrorHandler) {
            return next(err)
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(value => value.message);
            err = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const { products, productsCount } = await productService.getProducts(req.query)

        res.status(200).json({
            success: true,
            count: products.length,
            products,
            productsCount
        });
    }
    catch (err) {
        if (!err instanceof ErrorHandler) {
            return next(err)
        }

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    };
}

const getSingleProduct = async (req, res, next) => {
    try {
        const product = await productService.getSingleProduct(req.params.id);
        res.status(200).json({
            success: true,
            product,
        });
    }
    catch (err) {
        if (!err instanceof ErrorHandler) {
            return next(err)
        }

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        })
    }
};

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
