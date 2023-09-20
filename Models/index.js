// importing modules
const { Sequelize, DataTypes } = require('sequelize');
const { UserModel } = require('./User/userModel.js');
const { ProductModel } = require('./Product/productModel.js');
const { CartModel } = require('./Cart/cartModel.js');
const { OrderModel } = require('./Order/orderModel.js');
// const { CartProducts } = require('./CartProducts/cartProductsModel.js');

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5432
//database name is newecom

const sequelize = new Sequelize(`postgres://postgres:123456@localhost:5432/newecom`, {dialect: "postgres"});

// checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to newecom`)
}).catch((err) => {
    console.log(err)
});

const db = {};

// connecting to model
db.users = UserModel(sequelize, DataTypes);
db.products = ProductModel(sequelize, DataTypes);
db.carts = CartModel(sequelize, DataTypes);
db.orders = OrderModel(sequelize, DataTypes);

// Users and Carts one-to-one association
db.users.hasOne(db.carts);
db.carts.belongsTo(db.users);

// Users and Orders one-to-many association
db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

// Carts and Products many-to-many association

// Creating through table for cart and products
const CartProducts = sequelize.define( "cart_products", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

db.carts.belongsToMany(db.products, { through: CartProducts });
db.products.belongsToMany(db.carts, { through: CartProducts });

// Orders and Products many-to-many association

const OrderProducts = sequelize.define( "order_products", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

db.orders.belongsToMany(db.products, {through: OrderProducts});
db.products.belongsToMany(db.orders, {through: OrderProducts});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// exporting the module
module.exports = {
    db,
    CartProducts,
    OrderProducts
};