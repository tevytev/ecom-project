const express = require('express');
const userController = require('../Controllers/registrationController');
const { signup, login } = require('../Controllers/registrationController');
const { getUserInfo, editUserInfo } = require('../Controllers/userController');
const userAuth = require('../Middleware/userMiddleware/userAuth');

const router = express.Router();

// signup endpoint
// passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup);

// login route
router.post('/login', login);

// get specific user info
router.get('/:username', userAuth.userAuthorization, getUserInfo);

// update user info
router.put('/update', userAuth.userAuthorization, editUserInfo);

module.exports = router;