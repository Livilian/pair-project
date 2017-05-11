var express = require('express');
var router = express.Router();
const Library = require("../models/library.js");

const { ensureLoggedIn } = require('connect-ensure-login');

/* GET users listing. */
router.get('/profile', ensureLoggedIn('/login'), function(req, res, next) {
  const userId = req.user;
  Library.find({user_id: userId}, (err, libraries) => {
    if (err) {
      return;
    }
    res.render("profile",{libraries})
  });

});

router.get("/profile/:id", ensureLoggedIn('/login'), (req, res, next) => {
  res.send("Hey!");
});

module.exports = router;
