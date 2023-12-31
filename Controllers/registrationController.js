// importing modules
const bcrypt = require('bcrypt');
const {db} = require('../Models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// assigning users to the variable User and carts to variable Cart
const User = db.users;
const Cart = db.carts;

// signing a user up
// hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    // saving the user
    const user = await User.create(data);

    // creating and associating cart
    const cart = await Cart.create();
    await user.setCart(cart);
  
    // if user details is captured
    // generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: '1h',
      });
  
      res.cookie("jwt", token, { 
        maxAge: 1 * 24 * 60 * 60, 
        httpOnly: true 
      });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);

      // send users details
      const createdUser = await User.findOne({
        attributes: ['userName', 'email'],
        where: {
          email: email
        }
      });

      return res.status(201).send(createdUser);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

// login authentication
const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // find a user by their email
      const user = await User.findOne({
          where: {
              email: email
          }
      });

      // if user email is found, compare with bcrypt
      if (user) {
          const isSame = await bcrypt.compare(password, user.password);

          // if password is the same generate token with the users's id and the secretKey in the env file
          if (isSame) {
              let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                  expiresIn: '1h',
              });

              // if password matches with the one in the database go ahead and generate a cookie for the user
              res.cookie("jwt", token, { 
                maxAge: 1 * 24 * 60 * 60, 
                httpOnly: true 
              });
              console.log("user", JSON.stringify(user, null, 2));
              console.log(token);

              // send user data
              return res.status(201).json({
                'userName': `${user.userName}`,
                'email': `${user.email}`
              });
          } else {
              return res.status(401).send("Authentication failed");
          }
      } else {
          return res.status(401).send("Authentication failed");
      }
  } catch (error) {
      console.log(error);
  }
};

module.exports = {
    signup,
    login,
};