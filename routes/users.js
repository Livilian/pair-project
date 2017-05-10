var express = require('express');
var router = express.Router();
const Library = require("../models/library.js");

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  const userId = req.session.passport.user;
  Library.find({user_id: userId}, (err, libraries) => {
    if (err) {
      return;
    }
    res.render("profile",{libraries})
  });

});

router.get("/profile/:id", (req, res, next) => {
  res.send("Hey!");
});

module.exports = router;
