/*jshint esversion:6*/

//1.we requier is in our app.js and tell express app to use it
const express = require('express');
const User = require("../models/User");

const userRoutes = express.Router();

/* GET users listing. */
userRoutes.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  //we use mongoose to retrieve our useres from the DB
  console.log(req.session)
  res.render('userView/index', { user: req.body.user });
});



module.exports = userRoutes;
