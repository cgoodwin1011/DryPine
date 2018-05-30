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
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
      res.end();
    }).catch(function (err) {
      // console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.post("/api/login",
    passport.authenticate("local"),
    function (req, res, third) {
      // we never get here when authentication fails.....
      // console.log("req is", req.body);
      // console.log("-------------------------------");
      // console.log("res is", res);
      // console.log("-------------------------------");
      // console.log("third is ", third);
      res.redirect('/');
      res.end();
    });

  app.get("/api/login",
    passport.authenticate("local",
      {
        successRedirect: '/',
        failureRedirect: '/404', // see text
        // failureFlash: true // optional, see text as well
      }),
    function (req, res) {
      // console.log("res is", res);
      res.redirect('/');
      res.end();
    }
  );

  // log out current user
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // ---------------------------------------------------
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/conversations.html"));
  });

  // returns posts in presentation order
  app.get("/api/postsInOrder", function (req, res) {
    if (req.user != undefined) {
      console.log("there is a logged in user");
      db.Post.findAll({
        // sort: db.Post.postId,
        // order: [
        //   ['replyingTo'],
        //   ['postId']
        // ]
      }).then(function (results) {
        var threads = [];
        var threadCollector = [];
        var comments = [];
        
        for (i = 0; i < results.length; i++) {
          if (results[i].postId == results[i].replyingTo) {
            threads.push(results[i]);
          } else {
            comments.push(results[i]);
          }
        }

        // console.log(threads);

        sortPosts(threads, 'forward');
        console.log(threads);
        sortPosts(comments, 'forward');
        for (i=0; i<threads.length; i++) {
          threadCollector.push(threads[i]);
          for (j=0; j<comments.length; j++) {
            if (threads[i].postId == comments[j].replyingTo) {
              threadCollector.push(comments[j]);
            }
          }
        }
        // console.log(threadCollector);

        // need to attach req.user to the results.
        // here we sort posts so that threads are in revserse chronological order while comments are in chronological order.
        var user = [{
          user: req.user.email
        }];
        user.push(threadCollector);
        res.json(user);
      });
    } else {
      console.log("there is no logged in user");
      // TODO NEED TO ADD ERROR FUNCTION
    }
  });
  // ((x < y) ? -1 : ((x > y) ? 1 : 0))

  function sortPosts(posts, order) {
    // console.log("post 0 is ", posts[0]);
    if (order == 'forward') {
      posts.sort(function(a, b){return parseInt(a.postId) - parseInt(b.postId);});
    } else if (order = 'reverse') {
      posts.sort(function(a, b){return (parseInt(a.postId) - parseInt(b.postId));});
      posts.reverse();
    }
  }

  //get all posts
  // returning them as JSON.
  app.get("/api/allposts", function (req, res) {
    db.Post.findAll({})
      .then(function (results) {
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

  app.get("/api/user", function (req, res) {
    console.log(req.user);
    res.json(req.user);
  }
  )

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
      res.json(results);
    });
  });

  // Add a thread
  app.post("/api/newthread", function (req, res) {

    if (req.user) {

      db.Post.create({
        author: req.body.author,
        replyingTo: -1,
        pTimestamp: req.body.created_at,
        content: req.body.content,
      }).then(function (result) {
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
            }).then(function (nextresult) { });
        });
        res.end();
      });

    } else {
      res.end();
    }

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

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.username,
        id: req.user.id
      });
    }
  });

  // app.get("api/replypost/:id", function (req, res) {
  // });

  // should be an HTML route
  // app.get("/api/newthread", function (req, res) {
  //   // res.sendFile(path.join(__dirname, "../newPostTest.html"));
  //   // path.join(__dirname, "../newPostTest.html")
  // });

};