// importing modules
const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { db } = require('./Models');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

// setting up port
const PORT = 8080

// assigning the variable app to express
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// synchronizing the database and forcing it to false so we dont lose data

const Products = db.products;
const Users = db.users;
const Carts = db.carts;

(async () => {
    await db.sequelize.sync({ force: true }).then(() => {
        console.log("db has been re sync");

        // creating instances of products
        Products.create({ name: "Spider-man Graphic Tee", price: 10, category: "shirts" });
        Products.create({ name: "Bat-man Graphic Tee",price: 12,category: "shirts" });
        Products.create({ name: "Super-man Graphic Tee", price: 13, category: "shirts" });
        Products.create({ name: "NY Knicks Graphic Tee", price: 13, category: "shirts" });
        Products.create({ name: "LA Lakers Graphic Tee", price: 18, category: "shirts" });

        Products.create({ name: "Spider-man Pants", price: 12, category: "pants" });
        Products.create({ name: "Bat-man Pants",price: 15,category: "pants" });
        Products.create({ name: "Super-man Pants", price: 18, category: "pants" });
        Products.create({ name: "NY Knicks Pants", price: 22, category: "pants" });
        Products.create({ name: "LA Lakers Pants", price: 24, category: "pants" });

        Products.create({ name: "Spider-man Sneakers", price: 19, category: "sneakers" });
        Products.create({ name: "Bat-man Sneakers",price: 21,category: "sneakers" });
        Products.create({ name: "Super-man Sneakers", price: 22, category: "sneakers" });
        Products.create({ name: "NY Knicks Sneakers", price: 26, category: "sneakers" });
        Products.create({ name: "LA Lakers Sneakers", price: 28, category: "sneakers" });


    });
  })();

// routes for the user API
app.use('/api/users', userRoutes);

// routes for the product API
app.use('/api/products', productRoutes);

// routes for the cart API
app.use('/api/cart', cartRoutes);

// routes for the order API
app.use('/api/orders', orderRoutes);

// listening to server connection
app.listen(PORT, () => {
    console.log(`Server is connected on ${PORT}`)
});