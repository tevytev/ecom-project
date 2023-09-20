const { Sequelize } = require("sequelize");
// cart model
const OrderModel = (sequelize, DataTypes) => {
    const Order = sequelize.define( "order", {})

    return Order
};

module.exports = {
    OrderModel
}