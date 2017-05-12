/*jshint esversion:6*/

const express = require("express");
const Routes = express.Router();

const Book = require("../models/book.js");
const { ensureLoggedIn } = require('connect-ensure-login');


// Routes.get("/:id/book", (req, res, next)=> {
//   res.render("book");
// });


Routes.get("/search", (req, res, next)=> {
  let queryGenere = req.query.queryGenere
  Book.find({genre:queryGenere}, (err, books) => {
    res.render('books/searchResults', { books: books, searchQuery: queryGenere});
  })
});

Routes.get("/:id/detail", (req, res, next)=> {
  Book.findById(req.params.id,(err,book) =>{
    res.render('books/detail',{book:book})
  })
});

Routes.get('/:id/borrow', ensureLoggedIn('/login'), (req,res,next) => {
  let bookId = req.params.id;

  Book.findById(bookId, (err, book) =>{
    req.user.borrowed.push(bookId);
    req.user.save((err,user) =>{
      console.log("BOOK HAS BEEEN BORROWED" + bookId)
      res.redirect('/profile');
    });
  })

});

Routes.get("/new/:libraryId", (req, res, next)=> {
  res.render("books/new", {libraryId: req.params.libraryId});
});

Routes.post("/new/:libraryId", (req, res, next)=> {
  const title = req.body.title;
  const author = req.body.author;
  const isbn = req.body.isbn;
  const owner = req.user;
  const genre = req.body.genre;
  const library_id = req.params.libraryId;

  const newBook = Book({
    title: title,
    author: author,
    isbn: isbn,
    owner: owner,
    genre: genre,
    library_id: library_id
  });
  console.log(newBook);

  newBook.save((err) => {
    if(err) {
      res.render("books/new",{message: "Something went wrong"})
    }else {
      res.redirect("/library/" + library_id);
      // Save the library (get the library_id from URL parameter)
      // Redirect the user to /library/id => where id is newBook.library_id
    }
  });
});



module.exports = Routes;
