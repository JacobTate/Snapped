//Dependencies
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models/index");

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/reviews-on-wheels", { useNewUrlParser: true })
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/reviews-on-wheels";
mongoose.connect(MONGODB_URI);

//Create router
var router = express.Router();

//Router to redirect to Index
router.get("/", function (req, res) {
  res.redirect("/home");
});

//Route for inserting a new user into the Users schema
router.post("/newuser/:id", function(req, res) {
db.Users.create(req.body)
  .then(function(dbUsers) {
    res.json(dbUsers);
  })
  .catch(function(err) {
    res.json(err);
  });
});

//Export routes for server.js to use
module.exports = router;
