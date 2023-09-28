const express = require('express');
const userAuth = require('../Middleware/userMiddleware/userAuth');
const { getAllOrders, getOrderById } = require('../Controllers/orderController');

const router = express.Router();

// user authorization middleware

router.use('/', userAuth.userAuthorization);


// Order component
/**
 * @swagger
 * components:
 *   schemas:
 *     orders:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The order's ID.
 *           example: 2
 *         createdAt:
 *           type: string
 *           description: The order's creation date and time.
 *           example: Sep 25 21:21:42 -04
 *         updatedAt:
 *           type: string
 *           description: The order's latest update date and time.
 *           example: 2023-09-25 21:21:42.581-04
 *         userId:
 *           type: string
 *           description: The order's designated user's ID.
 *           example: 8e1141db-7af2-49ef-bfc9-6eeb99b8b312
 *     order_products:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           description: The quantity of the particular product in the given order.
 *           example: 5
 *         orderId:
 *           type: integer
 *           description: The ID of the given order.
 *           example: 2
 *         productId:
 *           type: integer
 *           description: the ID of the particular product in the given order.
 *           example: 3
 */

// get all user order history
/**
 * @swagger
 * /api/orders/:
 *   get:
 *     summary: Retrieve all of the user's orders
 *     description: Retrieve all of the signed in user's orders and their products from database.
 *     responses:
 *       200:
 *         description: An array of objects representing each individual user order. Each object comes with an attached "products" key with a value of an array containing objects that represent individual products in the order. Orders with more than one product will have multiple objects within the products array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The order's ID.
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     description: The order's creation date and time.
 *                     example: Sep 25 21:21:42 -04
 *                   updatedAt:
 *                     type: string
 *                     description: The order's latest update date and time.
 *                     example: 2023-09-25 21:21:42.581-04
 *                   userId:
 *                     type: string
 *                     description: The order's designated user's ID.
 *                     example: 8e1141db-7af2-49ef-bfc9-6eeb99b8b312
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The product's ID.
 *                           example: 2
 *                         name:
 *                           type: string
 *                           description: The product's name.
 *                           example: Bat-man Graphic Tee
 *                         price:
 *                           type: integer
 *                           description: The product's price.
 *                           example: 12
 *                         category:
 *                           type: string
 *                           description: The product's category.
 *                           example: shirts
 *                         createdAt:
 *                           type: string
 *                           description: The product's creation date and time.
 *                           example: 2023-09-25T22:22:51.562Z
 *                         updatedAt:
 *                           type: string
 *                           description: The product's latest update date and time.
 *                           example: 2023-09-25T22:22:51.562Z
 *                         order_products:
 *                           type: object
 *                           properties:
 *                             quantity:
 *                               type: integer
 *                               description: The product's quantity
 *                               example: 1
 *                             orderId:
 *                               type: integer
 *                               description: The order's ID.
 *                               example: 1
 *                             productId:
 *                               type: integer
 *                               description: The product's ID.
 *                               example: 2
 * 
 */
router.get('/', getAllOrders);

// get user order by orderId
/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Retrieve user's order that matches the given ID
 *     description: Retrieve signed in user's order that matches the given ID and it's products from database.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Integer that matches an order's ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An object representing the signed in user's order that mmatches the given orderId. This object comes with an attached "products" key with a value of an array containing objects that represent individual products in the order. Orders with more than one product will have multiple objects within the products array.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The order's ID.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   description: The order's creation date and time.
 *                   example: Sep 25 21:21:42 -04
 *                 updatedAt:
 *                   type: string
 *                   description: The order's latest update date and time.
 *                   example: 2023-09-25 21:21:42.581-04
 *                 userId:
 *                   type: string
 *                   description: The order's designated user's ID.
 *                   example: 8e1141db-7af2-49ef-bfc9-6eeb99b8b312
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The product's ID.
 *                         example: 2
 *                       name:
 *                         type: string
 *                         description: The product's name.
 *                         example: Bat-man Graphic Tee
 *                       price:
 *                         type: integer
 *                         description: The product's price.
 *                         example: 12
 *                       category:
 *                         type: string
 *                         description: The product's category.
 *                         example: shirts
 *                       createdAt:
 *                         type: string
 *                         description: The product's creation date and time.
 *                         example: 2023-09-25T22:22:51.562Z
 *                       updatedAt:
 *                         type: string
 *                         description: The product's latest update date and time.
 *                         example: 2023-09-25T22:22:51.562Z
 *                       order_products:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                             description: The product's quantity
 *                             example: 1
 *                           orderId:
 *                             type: integer
 *                             description: The order's ID.
 *                             example: 1
 *                           productId:
 *                             type: integer
 *                             description: The product's ID.
 *                             example: 2
 * 
 */
router.get('/:orderId', getOrderById);

module.exports = router;