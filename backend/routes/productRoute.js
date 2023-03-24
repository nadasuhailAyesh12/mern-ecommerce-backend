const productController = require('../controllers/ProductController')
const productRouter = require('express').Router()

productRouter.post('/', productController.createProduct)
productRouter.get('/', productController.getProducts)
productRouter.get('/:id', productController.getSingleProduct)
productRouter.put('/:id', productController.updateProduct)
productRouter.delete('/:id', productController.deleteProduct)

module.exports = productRouter;