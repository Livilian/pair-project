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

const ensureLogin = require("connect-ensure-login");

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
        res.redirect("/");
      }
    });
  });
});

//We have to redefine the GET method to send the errors to our view:
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login.ejs");
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,   //This is what will allow us to use flash messages in our application
  passReqToCallback: true
}));


authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private.ejs", { user: req.user });
});
//we declare the logout route
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
