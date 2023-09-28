const express = require('express');
const userController = require('../Controllers/registrationController');
const { signup, login } = require('../Controllers/registrationController');
const { getUserInfo, editUserInfo } = require('../Controllers/userController');
const userAuth = require('../Middleware/userMiddleware/userAuth');

const router = express.Router();

// User component
/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID.
 *           example: 8e1141db-7af2-49ef-bfc9-6eeb99b8b312
 *         userName:
 *           type: string
 *           description: The user's userName.
 *           example: Cookie123
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: Cookie@/example.com
 *         createdAt:
 *           type: string
 *           description: The user's creation date and time.
 *           example: Sep 25 21:21:42 -04
 *         updatedAt:
 *           type: string
 *           description: The user's latest update date and time.
 *           example: 2023-09-25 21:21:42.581-04
 */

// signup endpoint
// passing the middleware function to the signup
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Sign up user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's userName.
 *                 example: Cookie123
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: Cookie@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: fakepassword543
 *     description: Sign up user to app and return user credentials from database.
 *     responses:
 *       201:
 *         description: An object of the signed up user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                   example: Cookie123
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: Cookie@example.com
 *       
 */
router.post('/signup', userAuth.saveUser, signup);

// login route
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: Cookie@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: fakepassword543
 *     description: Login user to app and return user credentials from database.
 *     responses:
 *       201:
 *         description: An object of the logged in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                   example: Cookie123
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: Cookie@example.com
 */
router.post('/login', login);

// get specific user info
/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Retrieve user info that matches the given username
 *     description: Retrieve user info and credentials from database
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: String that matches a saved user's userName
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: An object of the requested user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: User's username.
 *                   example: Cookie123
 *                 email:
 *                   type: string
 *                   description: User's email.
 *                   example: Cookie@example.com
 */
router.get('/:username', userAuth.userAuthorization, getUserInfo);

// update user info
/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Edit active user's info
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's userName.
 *                 example: NewUserName
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: NewEmail@example.com
 *     description: Update user info and return updated user credentials from database
 *     responses:
 *       201:
 *         description: An object of the updated user credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: User's username.
 *                   example: NewUserName
 *                 email:
 *                   type: string
 *                   description: User's email.
 *                   example: NewEmail@example.com
 */
router.put('/update', userAuth.userAuthorization, editUserInfo);

module.exports = router;