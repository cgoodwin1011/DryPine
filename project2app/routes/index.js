var express = require('express');
var router = express.Router();
var pug = require('pug');


module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Hello'});
  });
}; 
