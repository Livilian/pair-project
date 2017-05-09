/*jshint esversion:6*/

const express = require("express");
const Routes = express.Router();

const Library = require("../models/library.js");
// requieres el formulario
Routes.get("/", (req, res, next)=> {
  res.render("library");
});
//completas el formulario
Routes.post("/", (req, res, next) => {
  const name = req.body.name;
  const userId = req.session.passport.user;
  console.log(userId);

  const newLibrary = Library({
    name: name,
    user_id: userId
  });

  newLibrary.save((err) => {
    if (err) {
      res.render("/", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
  // const newLibrary = {
  //   name: name,
  //   user_id: re
  // }
});

Routes.get("/:id", (req, res, next)=> {
  res.render("library");
});


module.exports = Routes;
