/*jshint esversion:6*/

const express = require("express");
const Routes = express.Router();

const Library = require("../models/library.js");
const Book = require("../models/book.js");


//completas el formulario
Routes.post("/new", (req, res, next) => {
  const name = req.body.name;
  const userId = req.session.passport.user;


  const newLibrary = Library({
    name: name,
    user_id: userId
  });

  newLibrary.save((err) => {
    if (err) {
      res.render("/profile", { message: "Something went wrong" });
    } else {
      res.redirect("/profile");
    }
  });
  // const newLibrary = {
  //   name: name,
  //   user_id: re
  // }
});
//En la ruta "library/:id" guardame en la variable libraryId el id de la libreria q recoges de la url

Routes.get("/:id", (req, res, next)=> {
  let libraryId = req.params.id;
  //buscame todos los libros que contengan en su campo Library_id esto --->req.params.id
  //y renderizame oneLibrary y haz lo que te salga de la polla con los datos que te paso ({books}).
  Book.find({library_id: libraryId}).then(function(books){
    res.render("oneLibrary", {books, id: libraryId});

  })

});


module.exports = Routes;
