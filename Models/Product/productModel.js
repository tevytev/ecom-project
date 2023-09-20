// product model
const ProductModel = (sequelize, DataTypes) => {
    const Product = sequelize.define( "product", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.REAL,
            unique: false,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Product
};

module.exports = {
    ProductModel
}