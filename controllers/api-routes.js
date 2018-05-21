// this should become a model file...   

var path = require('path')
var db = require("../models");

// the routes

module.exports = function (app) {

    // place holder for root
    app.get("/", function (req, res) {
      // console.log("at least we got this far");
      res.redirect('/api/publicposts');
    });

    //get all posts
    // returning them as JSON.
    app.get("/api/allposts", function (req, res) {
      // console.log(Post);
      db.Post.findAll({})
        .then(function (results) {
          console.log(results);
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
    })

    //get all public posts
    app.get("/api/publicposts", function (req, res) {
      db.Post.findAll({
        where: {
          conversationLoc: 0,
          correspondentId: -1
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
          postWriter: theUser
        }
      }).then(function (results) {
        res.json(results);
      });
    });


    //get all conversations where user participates
    app.get("/api/userConversations/:Id", function (req, res) {
      var theUser = req.params.Id;
      db.Post.findAll({
        where: {
          [Post.or]: [{
            initiatorId: theUser
          }, {
            correspondentId: theUser
          }, {
            postWriter: theUser
          }]
        }
      }).then(function (results) {
        res.json(results);
      });
    });

    // should be an HTML route
    app.get("/api/newthread", function (req, res) {
      res.sendFile(path.join(__dirname, "../newPostTest.html"));
      // path.join(__dirname, "../newPostTest.html")
    });

    // Add a thread
    app.post("/api/newthread", function (req, res) {
      var maxThread;
      db.Post.max('threadId').then(
        function (result) {
          maxThread = result;
          db.Post.create({
            groupId: 0,
            threadId: (maxThread + 1),
            conversationId: 0,
            conversationLoc: 0,
            initiatorId: req.body.initiatorId,
            correspondentId: -1,
            postWriter: req.body.postWriter,
            pTimestamp: req.body.created_at,
            headline: req.body.headline,
            content: req.body.content,
          }).then(function (results) {
            // `results` here would be the new thread
            res.end();
          });

        }
      );
    });

    app.post('api/newConversation/:threadId', function (req, res) {
      var currentThread = req.params.threadId
      var maxConvo;
      console.log("new conversation starter (first reply):\n", req.body);
      db.Post.max(conversationId, {
        where: {
          threadId: currentThread
        }
      }).then(
        function (result) {
          maxConvo = result;
          db.Post.create({
            groupId: 0,
            threadId: currentThread,
            conversationId: maxConvo + 1,
            conversationLoc: 1,
            initiatorId: req.body.initiatorId,
            correspondentId: req.body.correspondentId,
            postWriter: req.body.postWriter,
            pTimestamp: req.body.created_at,
            headline: req.body.headline,
            content: req.body.content,
          }).then(function (results) {
            // `results` here would be the new thread
            res.end();
          });
        }
      );
    });
  };