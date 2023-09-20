//importing modules
const express = require("express");
const {db} = require("../../Models");

//Assigning db.users to User variable
const Product = db.products;
const { Op } = require("sequelize");

const adjustPriceRange = async (req, res, next) => {

    const highestPrice = req.query.high;
    const lowestPrice = req.query.low;

    if (highestPrice && lowestPrice) {
        try {
            const products = await Product.findAll({
                attributes: ['name', 'price', 'category'],
                where: {
                    price: {
                        [Op.and]: {
                            [Op.lte]: highestPrice,
                            [Op.gte]: lowestPrice
                        }
                    }
                }
            });
    
            if (products) {
                req.priceAdjustedProducts = products;
                next();
            } else {
                return res.status(404).send('filters are not accepted');
            }
            
        } catch (error) {
            console.log(error);
        }
    } else {
        next();
    }
};

module.exports = {
    adjustPriceRange
}