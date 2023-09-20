const express = require('express');
const productController = require('../Controllers/productController');
const { 
    getAllProducts,
    getProductById
} = productController;
const { adjustPriceRange } = require('../Middleware/productMiddleware/productPricing')

const router = express.Router();

router.use('/', adjustPriceRange);

router.get('/', getAllProducts);
router.get('/:productId', getProductById);


module.exports = router;