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

  //get all posts
  // returning them as JSON.
  app.get("/api/allposts", function (req, res) {
    console.log("hi");
    db.Post.findAll({})
      .then(function (results) {
        // console.log(results);
        res.json(results);
      });
  });

  app.get("/api/postsInOrder", function(req, res) {
    console.log("calling posts in order");
    db.Post.findAll({
      // sort: db.Post.postId,
      order: [['replyingTo'],['postId']]
    }).then(function (results) {
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

  // Add a thread
  app.post("/api/newthread", function (req, res) {
    // var selfReply;
    // db.Post.max('postId').then(
    //   function (result) {
    //     selfReply = result+1;
      db.Post.create({
        author: req.body.author,
        replyingTo: -1,
        pTimestamp: req.body.created_at,
        content: req.body.content,
      }).then(function (result) {
        // console.log(result.get('postId'))
        var temp
        db.Post.findAll({
          where: {replyingTo: -1}
        }).then(function(result) {
          temp = result[0].postId;
          db.Post.update({replyingTo: temp}, {
            where: {postId: temp}
          },
        ).then(function(nextresult) {console.log("nothing")});
        });
        res.end();
      })

      // db.Post.findAll({
      //   replyingTo: { $col: 'db.Post.postId'}
      //   }, {
      //   where: {replyingTo: -1}
      // }
      // ).then(function(result) {
      //   console.log("all with missing replyTo's")
      //   console.log(result);
      // });
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