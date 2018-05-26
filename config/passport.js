var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var bodyParser = require('body-parser');

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(user) {
      //  no user with the given email
      if (!user) {
        return done(null, false, {message: "Incorrect email."
        });
      }
      // user exists, check password
      else if (!user.validPassword(password)) {
        return done(null, false, {message: "Incorrect password."});
      }
      // If none of the above, return the user
      return done(null, user);
    });
  }
));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


module.exports = passport;





// var bCrypt = require('bcrypt');


// module.exports = function (passport, user) {

//   var User = user;

//   var LocalStrategy = require('passport-local').Strategy;

//   passport.use('local-signup', new LocalStrategy(

//     {
//       usernameField: 'email',

//       passwordField: 'password',

//       passReqToCallback: true // allows us to pass back the entire request to the callback

//     },

//     function (req, email, password, done) {

//       var generateHash = function (password) {

//         return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

//       };

//   User.findOne({
//         where: {
//           email: email
//         }
//       }).then(function (user) {

//         if (user) {

//           return done(null, false, {
//             message: 'That email is already taken'
//           });

//         } else {

//           var userPassword = generateHash(password);

//           var data =

//             {
//               email: email,

//               password: userPassword,

//               firstname: req.body.firstname,

//               lastname: req.body.lastname

//             };

//           User.create(data).then(function (newUser, created) {

//             if (!newUser) {

//               return done(null, false);

//             }

//             if (newUser) {

//               return done(null, newUser);

//             }

//           });

//         }

//       });

//     }
///
//   ));

// }


//module.exports = function(passport,user){