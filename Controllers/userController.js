// importing modules
const bcrypt = require('bcrypt');
const { db } = require('../Models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// assigning users to the variable User and carts to variable Cart
const User = db.users;

const getUserInfo = async (req, res) => {
    
        const userId = req.userId;
        const { username } = req.params;

        try {
            const user = await User.findOne({
                attributes: ['userName', 'email'],
                where: {
                    id: userId
                }
            });

            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.log(error);
        }
};

const editUserInfo = async (req, res) => {

    const { userName, email } = req.body;
    const userId = req.userId;

    try {
        const updatedUser = await User.update({
            userName: userName,
            email: email
        }, {
            where: {
                id: userId
            }
        });

        if (updatedUser) {
            const newUser = await User.findOne({
                attributes: ['userName', 'email'],
                where: {
                    id: userId
                }
            });
    
            if (newUser) {
                res.status(201).send(newUser);
            }
        }

    } catch (error) {
        res.status(401).send('could not find user');
    }
};

module.exports = {
    getUserInfo,
    editUserInfo
}