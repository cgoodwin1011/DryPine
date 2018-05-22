// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var session = require("express-session");
var exphbs = require('express-handlebars');
var mysql = require('mysql');
// var methodOverride = require('method-override');

// Requiring passport as we've configured it
var passport = require("./config/passport");
var path = require("path");

// set up expree app
var app = express();
var PORT = process.env.PORT || 3000;

// set up express with bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// t-up server directory 
app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

// set up body parser for use with express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// Routes
// =============================================================
require("./controllers/api-routes.js")(app);



// start server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

// db.sequelize.sync({ force: true }).then(function() {
  // app.listen(PORT, function() {
  //   console.log("App listening on PORT " + PORT);
  // });
// });
