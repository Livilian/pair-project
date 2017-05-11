var express = require('express');
var router = express.Router();
const Library = require("../models/library.js");
const User = require("../models/user.js");

const { ensureLoggedIn } = require('connect-ensure-login');

/* GET users listing. */
router.get('/profile', ensureLoggedIn('/login'), function(req, res, next) {
  const userId = req.user;
  Library.find({user_id: userId}, (err, libraries) => {
    if (err) {
      return;
    }
    User.find({_id: userId}, (err, user) => {
      if (err) {
        return;
      }
      res.render("profile",{libraries, user})
    });
  });

});

router.get("/profile/:id", ensureLoggedIn('/login'), (req, res, next) => {
  res.send("Hey!");
});

module.exports = router;
