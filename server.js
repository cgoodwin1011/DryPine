// dependencies
var express = require('express');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');
var mysql = require('mysql');
// var methodOverride = require('method-override');
// var routes = require("./controllers/api-routes.js");

// set up expree app
var app = express();
var PORT = process.env.PORT || 3000;

// set up express with bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// t-up server directory 
app.use(express.static("public"));

// var routes = require('./controllers/beer_controllers.js');

// set up handlebars -- need to revise since using Pug/Jade
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// app.use('/', routes);
// app.use('/api/allposts', routes);
// app.use('/api/publicposts', routes);
// app.use('/api/userposts/:Id', routes);
// app.use('/api/userposts/:Id', routes);
// app.use('/api/userConversations/:Id', routes);

// Requiring our models for syncing
var db = require("./models");

// Set up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./controllers/api-routes.js")(app);
// require("./controlers/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });
