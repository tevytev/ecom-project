const express = require("express");
const { db } = require("../../Models");

const Carts = db.carts;

const findUserCart = async (req, res, next) => {

    const userId = req.userId;

    if (userId) {
        try {
            const cart = await Carts.findOne({
                where: {
                    userId: userId
                }
            });
        
            if (cart) {
                req.cartId = cart.id;
                next();
            } else {
                res.status(404).send('Could not locate cart');
            }
        } catch (error) {
            console.log(error);   
        }
    } else {
        res.status(404).send('Could not authenticate JWT');
    }
    
};

module.exports = {
    findUserCart
}