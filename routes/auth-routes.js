/*jshint esversion:6*/
const express = require("express");
const authRoutes = express.Router();

//User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;

//we require passport to use it in our routes
const passport      = require("passport");

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup.ejs");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username: username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        console.log("USER CREATED SUCCESS");
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login",{title:res.locals.title + " - Mylogin"});
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
}));

authRoutes.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRoutes;
