
//importing modules
const express = require("express");
const {db} = require("../../Models");
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
//Assigning db.users to User variable
const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const username = await User.findOne({
     where: {
       userName: req.body.userName,
     },
   });
   //if username exist in the database respond with a status of 409
   if (username) {
     return res.json(409).send("username already taken");
   }

   //checking if email already exist
   const emailcheck = await User.findOne({
     where: {
       email: req.body.email,
     },
   });

   //if email exist in the database respond with a status of 409
   if (emailcheck) {
     return res.json(409).send("Authentication failed");
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

const userAuthorization = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const data = jwt.verify(token, process.env.secretKey);
      req.userId = data.id;
      next();
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.status(401).send('Please sign up or login in order to continue');
  }
};

//exporting module
 module.exports = {
  saveUser,
  userAuthorization
};