const express = require('express');
const userAuth = require('../Middleware/userMiddleware/userAuth');
const { getAllOrders, getOrderById } = require('../Controllers/orderController');

const router = express.Router();

// user authorization middleware
router.use('/', userAuth.userAuthorization);

// get all user order history
router.get('/', getAllOrders);

// get user order by orderId
router.get('/:orderId', getOrderById);

module.exports = router;