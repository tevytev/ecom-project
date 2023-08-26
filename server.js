// importing modules
const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./Models');
const userRoutes = require('./Routes/userRoutes');
const cors = require('cors');
// const userController = require('./Controllers/userController');
// const { signup, login } = userController;
// const userAuth = require('./Middleware/userAuth');

// setting up port
const PORT = 8080

// assigning the variable app to express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
});

// routes for the user API
app.use('/api/users', userRoutes);

// listening to server connection
app.listen(PORT, () => {
    console.log(`Server is connected on ${PORT}`)
});

// {
//     "userName": "Rich4040",
//     "email": "racheal4@gmail.com",
//     "password": "banana40"
// }