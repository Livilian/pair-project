/*jshint esversion:6*/

const express = require("express");
const Routes = express.Router();

const Library = require("../models/library.js");
const Book = require("../models/book.js");
const { ensureLoggedIn } = require('connect-ensure-login');


Routes.get("/:id",ensureLoggedIn('/login'), (req, res, next)=> {
  let libraryId = req.params.id;
  //buscame todos los libros que contengan en su campo Library_id esto --->req.params.id
  //y renderizame oneLibrary y haz lo que te salga de la polla con los datos que te paso ({books}).
  Book.find({library_id: libraryId}).then(function(books){

    var myBorrowed = req.user.borrowed;
    console.log(myBorrowed)
    for(var j=0; j<books.length; j++){
      for(var i =0; i<myBorrowed.length; i++){
        if(myBorrowed[i] == books[j]._id.toString()){
          books[j].isBorrowed = true;
          break;
        }
      }
    }
    res.render("library/list", {books, id: libraryId});
  }).catch(err => {
    console.log(err)
  })
});


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
});
//En la ruta "library/:id" guardame en la variable libraryId el id de la libreria q recoges de la url

Routes.get("/:id/delete",(req, res, next)=>{
  let libraryId = req.params.id;
  console.log("DELETE LIBRARY:"+libraryId)
  Library.remove({ _id :libraryId }, (err, resp) => {
  //   if (err) { return err};
    res.redirect("/profile");
  })
});


module.exports = Routes;
