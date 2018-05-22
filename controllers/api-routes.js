// this should become a model file...   

var path = require('path');
var db = require("../models");

// the routes

module.exports = function (app) {

    // place holder for root
    app.get("/", function (req, res) {
      // console.log("at least we got this far");
      res.redirect('/api/allposts');
    });

    //get all posts
    // returning them as JSON.
    app.get("/api/allposts", function (req, res) {
      console.log("hi");
      db.Post.findAll({})
        .then(function (results) {
          console.log(results);
          res.json(results);
        });
    });

    app.get("/api/postsInOrder", function(req, res) {
      console.log("calling posts in order");
      db.Post.findAll({
        // sort: db.Post.postId,
        order: [['replyingTo'],['pTimestamp']]
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
      var selfReply;
      db.Post.max('postId').then(
        function (result) {
          selfReply = result+1;
          db.Post.create({
            author: req.body.author,
            replyingTo: selfReply,
            pTimestamp: req.body.created_at,
            content: req.body.content,
          }).then(function (results) {
            // `results` here would be the new thread
            res.end();
          });
        }
      );
    });

    app.post("/api/newreply", function (req, res) {
      db.Post.create({
        author: req.body.author,
        replyingTo: req.body.replyingTo,
        pTimestamp: req.body.created_at,
        content: req.body.content,
      }).then(function (results) {
        // `results` here would be the new thread
        res.end();
      });
    });

  // should be an HTML route
  app.get("/api/newthread", function (req, res) {
    res.sendFile(path.join(__dirname, "../newPostTest.html"));
    // path.join(__dirname, "../newPostTest.html")
  });

};