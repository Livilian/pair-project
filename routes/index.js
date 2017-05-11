var express = require('express');
var router = express.Router();
const Book = require("../models/book.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.find({}, (err, books) => {
    res.render('index', { title: 'LENDIFY', books: books });
  })

});

module.exports = router;
