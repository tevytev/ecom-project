const express = require('express');
const userAuth = require('../Middleware/userMiddleware/userAuth');
const { findUserCart } = require('../Middleware/cartMiddleware/findCart');
const { getCart, insertIntoCartProducts, deleteCartProducts, checkoutCart } = require('../Controllers/cartController');
const { paymentAuth } = require('../Middleware/cartMiddleware/paymentProcess');

const router = express.Router();

// User authorization and cart validation middlewares
router.use('/', userAuth.userAuthorization, findUserCart)

// Get user cart
router.get('/', getCart);

// Add product to user cart
router.post('/:productId', insertIntoCartProducts);

// Delete item from user cart
router.delete('/:productId', deleteCartProducts);

// checkout user cart
router.post('/:cartId/checkout', paymentAuth, checkoutCart);

module.exports = router;