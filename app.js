/*jshint esversion:6*/
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
const session       = require("express-session");
const bcrypt        = require("bcrypt");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//1.require authRoutes
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/users-routes");
const User = require("./models/User");
var index = require('./routes/index');

//we define the db connection with mongoose (this creates the DB pair-project)
mongoose.connect("mongodb://localhost/pair-project");

// Express instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//we define the strategy, the user serializer and the user deserializer methods
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });  //error al hacer login??
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);//when logging in- Error: passport.initialize() middleware not in use at User.findOne
  });
}));

//Initialize passport and passport session like a middleware, BELOW THE CODE ABOVE
//TIENE QUE IR POR ENCIMA DE LAS RUTAS, y las rutas tienen que estar en orden de uso
app.use(passport.initialize());
app.use(passport.session());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//we conf express-session, indicating the secret key it will use to be generated
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

app.use('/', index);
app.use("/", authRoutes);
app.use("/profile", userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
