const express = require('express');
const userAuth = require('../Middleware/userMiddleware/userAuth');
const { findUserCart } = require('../Middleware/cartMiddleware/findCart');
const { getCart, insertIntoCartProducts, deleteCartProducts, checkoutCart } = require('../Controllers/cartController');
const { paymentAuth } = require('../Middleware/cartMiddleware/paymentProcess');

const router = express.Router();

// User authorization and cart validation middlewares
router.use('/', userAuth.userAuthorization, findUserCart)

// Cart component
/**
 * @swagger
 * components:
 *   schemas:
 *     carts:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The cart's ID.
 *           example: 2
 *         createdAt:
 *           type: string
 *           description: The cart's creation date and time.
 *           example: Sep 25 21:21:42 -04
 *         updatedAt:
 *           type: string
 *           description: The cart's latest update date and time.
 *           example: 2023-09-25 21:21:42.581-04
 *         userId:
 *           type: string
 *           description: The cart's designated user's ID.
 *           example: 8e1141db-7af2-49ef-bfc9-6eeb99b8b312
 *     cart_products:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           description: The quantity of the particular product in the given cart
 *           example: 5
 *         cartId:
 *           type: integer
 *           description: The ID of the given cart
 *           example: 2
 *         productId:
 *           type: integer
 *           description: the ID of the particular product in the given cart
 */

// Get user cart
/**
 * @swagger
 * /api/cart/:
 *   get:
 *     summary: Retrieve user cart
 *     description: Retrieve signed in user cart and it's current products from database
 *     responses:
 *       200:
 *         description: An object representing the signed in user's cart. This object comes with an attached "products" key with a value of an array containing objects that represent individual products in the cart. Carts with more than one product will have multiple objects within the products array.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The cart's ID.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   description: The cart's creation date and time.
 *                   example: 2023-09-25T22:23:04.573Z
 *                 updatedAt:
 *                   type: string
 *                   description: The cart's latest update date and time.
 *                   example: 2023-09-25T22:23:04.577Z
 *                 userId:
 *                   type: string
 *                   description: The cart's designated user's ID.
 *                   example: 2a98f8a4-d253-4121-97ce-c7ee5ee39289
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
 *                       cart_products:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                             description: The product's quantity
 *                             example: 1
 *                           cartId:
 *                             type: integer
 *                             description: The cart's ID.
 *                             example: 1
 *                           productId:
 *                             type: integer
 *                             description: The product's ID.
 *                             example: 2
 */
router.get('/', getCart);

// Add product to user cart
/**
 * @swagger
 * /api/cart/{productId}:
 *   post:
 *     summary: Add product that matches the given ID to user cart
 *     description: Add product with matching ID to signed in user's cart and returns the updated cart from database
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: integer that matches a saved product's ID
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: An object representing the signed in user's cart. This object comes with an attached "products" key with a value of an array containing objects that represent individual products in the cart. Carts with more than one product will have multiple objects within the products array. The new product added will be added to the end of the products array. If a product that is already present in the user's cart is added again, that product's quantity will icrement.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The cart's ID.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   description: The cart's creation date and time.
 *                   example: 2023-09-25T22:23:04.573Z
 *                 updatedAt:
 *                   type: string
 *                   description: The cart's latest update date and time.
 *                   example: 2023-09-25T22:23:04.577Z
 *                 userId:
 *                   type: string
 *                   description: The cart's designated user's ID.
 *                   example: 2a98f8a4-d253-4121-97ce-c7ee5ee39289
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
 *                       cart_products:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                             description: The product's quantity
 *                             example: 1
 *                           cartId:
 *                             type: integer
 *                             description: The cart's ID.
 *                             example: 1
 *                           productId:
 *                             type: integer
 *                             description: The product's ID.
 *                             example: 2
 */
router.post('/:productId', insertIntoCartProducts);

// Delete item from user cart
/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove product that matches the given ID from user cart
 *     description: Remove product with matching ID from signed in user's cart and returns the updated cart from database
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: integer that matches a saved product's ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An object representing the signed in user's cart. This object comes with an attached "products" key with a value of an array containing objects that represent individual products in the cart. Carts with more than one product will have multiple objects within the products array. The removed product's object will no longer be in the products array.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The cart's ID.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   description: The cart's creation date and time.
 *                   example: 2023-09-25T22:23:04.573Z
 *                 updatedAt:
 *                   type: string
 *                   description: The cart's latest update date and time.
 *                   example: 2023-09-25T22:23:04.577Z
 *                 userId:
 *                   type: string
 *                   description: The cart's designated user's ID.
 *                   example: 2a98f8a4-d253-4121-97ce-c7ee5ee39289
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
 *                       cart_products:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                             description: The product's quantity
 *                             example: 1
 *                           cartId:
 *                             type: integer
 *                             description: The cart's ID.
 *                             example: 1
 *                           productId:
 *                             type: integer
 *                             description: The product's ID.
 *                             example: 2
 */
router.delete('/:productId', deleteCartProducts);

// checkout user cart
/**
 * @swagger
 * /api/cart/{cartId}/checkout:
 *   post:
 *     summary: Checkout user cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardNumber:
 *                 type: string
 *                 description: The user's userName.
 *                 example: 3493 7003 8656 069
 *     description: Checkout the signed in user's cart and returns the new order from database
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: integer that matches a user cart's ID
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: An object representing the signed in user's new order. This object comes with an attached "products" key with a value of an array containing objects that represent individual products in the order. Orders with more than one product will have multiple objects within the products array.
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
 *                   example: 2023-09-25T22:23:04.573Z
 *                 updatedAt:
 *                   type: string
 *                   description: The order's latest update date and time.
 *                   example: 2023-09-25T22:23:04.577Z
 *                 userId:
 *                   type: string
 *                   description: The order's designated user's ID.
 *                   example: 2a98f8a4-d253-4121-97ce-c7ee5ee39289
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
 *                       cart_products:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                             description: The product's quantity
 *                             example: 1
 *                           cartId:
 *                             type: integer
 *                             description: The cart's ID.
 *                             example: 1
 *                           productId:
 *                             type: integer
 *                             description: The product's ID.
 *                             example: 2
 */
router.post('/:cartId/checkout', paymentAuth, checkoutCart);

module.exports = router;