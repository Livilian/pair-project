/*jshint esversion:6*/
//In this file, we'll create false users, libraries and books (seeding data = fake data)

//we require the User, and mongoose (because our app isn’t running)
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pair-project");
const User = require('../models/User');

//we define some fake users
const users = [
  {
    username: "oli",
    password: 1234,
    name: "Olivia",
    email: "invented@whatever.com",
    // libraries: [Schema.Types.ObjectId]
  },
  {
    username: "pablo",
    password: 5678,
    name: "Pablo",
    email: "superinvented@whatever.com",
    // libraries: [Schema.Types.ObjectId]
  }
];

//we save the  users in our  DB, and close the conenction
User.create(users, (err, docs) =>{
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(user.name);
  });
  mongoose.connection.close();
});

// we run our seeds file in the terminal:
//We need to be inside our project: $ cd pair-project !!
//$ node bin/seeds.js
//check if it worked
//$ mongo
