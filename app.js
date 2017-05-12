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
const User = require("./models/user");
const Book = require("./models/book");
const expressLayouts = require("express-ejs-layouts");


//we define the db connection with mongoose
mongoose.connect("mongodb://localhost/passport-local");

//routes
const authRoutes = require("./routes/auth-routes");
const libraryRoutes = require("./routes/libraries");
const index = require('./routes/index');
const users = require('./routes/users');
const bookRoutes = require("./routes/books");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','layouts/main-layout');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return err;
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));

app.use(function(req,res,next){
  res.locals.title = "Lendify";
  res.locals.user = req.user;
  next();
})

//me controla los middleware
//primer parametro : prefijo de las rutas. segundo parametro: las rutas.
app.use('/', index);
app.use('/', authRoutes); //?
app.use('/', users);
app.use('/library', libraryRoutes);
app.use('/book', bookRoutes);




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
  res.render(err);
});

module.exports = app;
