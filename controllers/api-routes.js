// this should become a model file...
var express = require('express');
var router = express.Router();
var path = require('path');
var db = require("../models");

// the routes

module.exports = function (app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // get all posts in no specified order (presumably by ID)
  // returning them as JSON.
  app.get("/api/allposts", function (req, res) {
    console.log("hi");
    db.Post.findAll({})
      .then(function (results) {
        // console.log(results);
        res.json(results);
      });
  });


  // returns posts sorted into threads
  app.get("/api/postsInOrder", function(req, res) {
    console.log("calling posts in order");
    db.Post.findAll({
      // sort: db.Post.postId,
      order: [['replyingTo'],['postId']]
    }).then(function (results) {
      res.json(results);
    });

  });


  // returns any partical post by postId
  app.get("/api/thisPost/:id", function (req, res) {
    db.Post.findAll({
      where: {
        postId: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // returns all posts by a user
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

  // returns thread starting posts
  app.get("/api/originalPosts", function (req, res) {
    db.Post.findAll( {
      where: {
        postId: {
            $col: 'replyingTo'
        }
      }
    }).then(function(results) {
      // console.log(db.sequelize.col('replyingTo'))
      res.json(results);
    });
  });

  // starts a new thread
app.post("/api/newthread", function (req, res) {
      db.Post.create({
        author: req.body.author,
        replyingTo: -1,
        pTimestamp: req.body.created_at,
        content: req.body.content,
      }).then(function (result) {
        // return to the db to get the post's ID 
        // SQL db won't supply ID until after the post is created.  
        // for initial posts, the replyingTo: field is set to postID....
        var temp;
        db.Post.findAll({
          where: {replyingTo: -1}
          }).then(function(result) {
          temp = result[0].postId;
          db.Post.update({replyingTo: temp}, 
            {
              where: {postId: temp}
            }).then(function(nextresult) {console.log("nothing");});
        });
        res.end();
      });
  });

  // adds a reply to an existing thread.  
  // replyingto field is set to ID of first post in thread.  
  app.post("/api/newreply/:id", function (req, res) {
    db.Post.create({
      author: req.body.author,
      replyingTo: parseInt(req.params.id),
      pTimestamp: req.body.created_at,
      content: req.body.content,
    }).then(function (results) {
      res.redirect('/');
    });
  });
};