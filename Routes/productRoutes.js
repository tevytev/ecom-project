const express = require('express');
const productController = require('../Controllers/productController');
const { 
    getAllProducts,
    getProductById
} = productController;
const { adjustPriceRange } = require('../Middleware/productMiddleware/productPricing')

const router = express.Router();

router.use('/', adjustPriceRange);

// Product Component
/**
 * @swagger
 * components:
 *   schemas:
 *     products:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product's ID.
 *           example: 2
 *         name:
 *           type: string
 *           description: The product's name.
 *           example: Spider-man Graphic Tee
 *         price:
 *           type: integer
 *           description: The product's price.
 *           example: 15
 *         category:
 *           type: string
 *           description: The product's category.
 *           example: shirts
 *         createdAt:
 *           type: string
 *           description: The product's creation date and time.
 *           example: Sep 25 21:21:42 -04
 *         updatedAt:
 *           type: string
 *           description: The product's latest update date and time.
 *           example: 2023-09-25 21:21:42.581-04
 */

/**
 * @swagger
 * /api/products/:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve all products and their info from database
 *     responses:
 *       201:
 *         description: An array of objects representing each individual product in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The product name.
 *                     example: Spider-man Graphic Tee
 *                   price:
 *                     type: integer
 *                     description: The product's price.
 *                     example: 10
 *                   category:
 *                     type: string
 *                     description: The product's category.
 *                     example: shirts
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Retrieve product that matches the given ID
 *     description: Retrieve product that matches the given ID and it's info from database.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Integer that matches a saved product's ID
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: An object representing the product that matches the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The product name.
 *                     example: Spider-man Graphic Tee
 *                   price:
 *                     type: integer
 *                     description: The product's price.
 *                     example: 10
 *                   category:
 *                     type: string
 *                     description: The product's category.
 *                     example: shirts
 *                 
 */
router.get('/:productId', getProductById);


module.exports = router;