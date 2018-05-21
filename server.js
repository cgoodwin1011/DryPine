<<<<<<< HEAD
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
=======
require("dotenv").config();
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var faker = require("faker");
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

var app = express();
if(process.env.NODE_ENV === "DEV") { // Configuration for development environment
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");
    var webpackConfig = require("./webpack.config.js");
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(webpackCompiler, {
      hot: true
    }));
    app.use(webpackHotMiddleware(webpackCompiler));
    app.use(express.static(path.join(__dirname, "app")));
} else if(process.env.NODE_ENV === "PROD") { // Configuration for production environment
    app.use(express.static(path.join(__dirname, "dist")));
}

app.use(function(req, res, next){
    console.log("Request from: ", req.url);
    next();
})

// Endpoint to generate access token
app.get("/token", function(request, response) {
    var identity = faker.name.findName();

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token
    token.identity = identity;

    const grant = new VideoGrant();
   // Grant token access to the Video API features
   token.addGrant(grant);

   // Serialize the token to a JWT string and include it in a JSON response
   response.send({
       identity: identity,
       token: token.toJwt()
   });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Express server listening on *:" + port);
});
>>>>>>> 6944a38c8dd1eb79e41460075559cd850c68f03a
