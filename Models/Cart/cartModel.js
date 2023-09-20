const { Sequelize } = require("sequelize");
// cart model
const CartModel = (sequelize, DataTypes) => {
    const Cart = sequelize.define( "cart", {})

    return Cart
};

module.exports = {
    CartModel
}

