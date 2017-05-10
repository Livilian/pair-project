/*jshint esversion:6*/

const express = require("express");
const Routes = express.Router();

const Book = require("../models/book.js");

// Routes.get("/:id/book", (req, res, next)=> {
//   res.render("book");
// });

Routes.get("/:id/book/new", (req, res, next)=> {
  res.render("book", {id: req.params.id});
});

Routes.post("/:id/book/new", (req, res, next)=> {
  const title = req.body.title;
  const author = req.body.autor;
  const isbn = req.body.isbn;
  const owner = req.user;
  const genre = req.body.genre;
  const library_id = req.params.id;


  const newBook = Book({
    title: title,
    author: author,
    isbn: isbn,
    owner: owner,
    genre: genre,
    library_id: library_id
  });

  newBook.save((err) => {
    if(err) {

      res.render("/book/new",{message: "Something went wrong"})
    }else {
      res.redirect("/library/" + library_id);
      // Save the library (get the library_id from URL parameter)
      // Redirect the user to /library/id => where id is newBook.library_id
    }
  });




});

module.exports = Routes;
