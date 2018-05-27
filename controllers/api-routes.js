// this should become a model file...
var express = require('express');
var router = express.Router();
var path = require('path');
var db = require("../models");
var passport = require('../config/passport');
var path = require("path");
var env = require("dotenv").load();

// the routes

module.exports = function (app) {

  app.post("/api/signup", function (req, res) {
    console.log("req.body is ", req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      // res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // login for existing users
  app.post("/api/login", 
  //   passport.authenticate("local",
  //   {
  //       successRedirect : '/',
  //       failureRedirect : '/',
  //       failureFlash : true
  //   })
  // );
    function (req, res) {
      console.log("req in login is ", req);
      res.redirect('/api/postsinorder');
      // res.redirect('/api/postsinorder');
    }
  );

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // ---------------------------------------------------
  app.get("/", function (req, res) {
    console.log("req.user is", req.user);
    res.sendFile(path.join(__dirname, "../public/conversations.html"));

  });

  // returns posts in presentation order
  app.get("/api/postsInOrder", function (req, res) {
    console.log("calling posts in order");
    // console.log("user is ", req.user);
    if (req.user != undefined) {
      // there is a logged in user
      db.Post.findAll({
        // sort: db.Post.postId,
        order: [
          ['replyingTo'],
          ['postId']
        ]
      }).then(function (results) {
        // need to attach req.user to the results.  
        var user = [{
          user: req.user.email
        }];
        // console.log("user array is ", user);
        user.push(results);
        // console.log("user array is ", user);
        res.json(user);
      });
    } else {
      console.log("there is no logged in user");
      // TODO NEED TO ADD ERROR FUNCTION
    }
  });

  //get all posts
  // returning them as JSON.
  app.get("/api/allposts", function (req, res) {
    db.Post.findAll({})
      .then(function (results) {
        // console.log(results);
        res.json(results);
      });
  });

  app.get("/api/thisPost/:id", function (req, res) {
    db.Post.findAll({
      where: {
        postId: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  //get all posts by user
  app.get("/api/userPosts/:Id", function (req, res) {
    var theUser = req.params.Id;
    db.Post.findAll({
      where: {
        author: theUser
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/originalPosts", function (req, res) {
    db.Post.findAll({
      where: {
        postId: {
          $col: 'replyingTo'
        }
      }
    }).then(function (results) {
      // console.log(db.sequelize.col('replyingTo'))
      res.json(results);
    });
  });

  // Add a thread
  app.post("/api/newthread", function (req, res) {
    db.Post.create({
      author: req.body.author,
      replyingTo: -1,
      pTimestamp: req.body.created_at,
      content: req.body.content,
    }).then(function (result) {
      // console.log(result.get('postId'))
      var temp;
      db.Post.findAll({
        where: {
          replyingTo: -1
        }
      }).then(function (result) {
        temp = result[0].postId;
        db.Post.update({
          replyingTo: temp
        }, {
          where: {
            postId: temp
          }
        } ).then(function (nextresult) {
          console.log("nothing");
        });
      });
      res.end();
    });
  });

  app.post("/api/newreply/:id", function (req, res) {
    db.Post.create({
      author: req.body.author,
      // replyingTo: 99,
      replyingTo: parseInt(req.params.id),
      pTimestamp: req.body.created_at,
      content: req.body.content,
    }).then(function (results) {
      res.redirect('/');
    });
  });






  // app.get("api/replypost/:id", function (req, res) {
  // });

  // should be an HTML route
  // app.get("/api/newthread", function (req, res) {
  //   // res.sendFile(path.join(__dirname, "../newPostTest.html"));
  //   // path.join(__dirname, "../newPostTest.html")
  // });

};