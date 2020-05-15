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
  res.redirect("/index");
});

//Router to display all articles 
router.get("/index", function(req, res) {
    db.Articles.find({}).lean()
    .populate("comments")
    .then(function(data) {    
      var results = {articles: data}
      res.render("index", results);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      console.log("error fetching articles")
      res.json(err);
    });
});

router.get("/scrape", function(req, res) {

  // First, we grab the body of the html with axios
  axios.get("https://www.motor1.com/news/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      
      // Now, we grab every div within an div tag, and do the following:
      $("div div").each(function(i, element) {
        //Get the class to filter the results
        var classCheck = {};
        classCheck.value = $(this).attr("class");
        //console.log("div class: " + classCheck.value);
  
        //Filter down to the class for reviews
        if (classCheck.value == 'text-box') {
  
        //Save an empty result object
        var result = {};
        
        //Prefix the link to generate a full URL
        result.link = "https://www.motor1.com"
     
        //Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("h3")
          .text();
        result.link += $(this)
          .children("a")
          .attr("href");
        result.summary = $(this)
          .children("a")
          .text();
  
          //Create a new Article using the `result` object built from scraping
          db.Articles.create(result)
            .then(function(dbArticles) {
              console.log(dbArticles);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        }
      });
      res.redirect("/");
    });
});

//Route for getting all Articles from the db
router.get("/articles", function(req, res) {
  db.Articles.find({})
    .then(function(dbArticles) {
      res.json(dbArticles);
    })
    .catch(function(err) {
      res.json(err);
    });
  });

//Route for grabbing a specific Article by id and populate it with linked comments
router.get("/articles/:id", function(req, res) {
db.Articles.findOne({ _id: req.params.id }).lean()
  .populate("comments")
  .then(function(data) {
    var results = {comments: data}  
    console.log(results)
    res.render("comments", results);
  })
  .catch(function(err) {
    res.json(err);
  });
});

//Route for creating a comment linked to an article
router.post("/comments/:id", function(req, res) {
db.Comments.create(req.body)
  .then(function(dbComments) {
    return db.Articles.findOneAndUpdate({ _id: req.params.id }, {$push: { comments: dbComments._id }}, { new: true })  
  })
  .then(function(dbArticles) {
    res.json(dbArticles);
  })
  .catch(function(err) {
    res.json(err);
  });
});

//Route for deleting a comment linked to an article
router.delete("/comments/delete/:comments_id/:articles_id", function(req, res) {

  console.log("you are in the article controller delete section")
  db.Comments.deleteOne({_id: req.params.comments_id})
    .then(function(dbComments) {
      return db.Articles.findOneAndUpdate({ _id: req.params.articles_id }, {$pull: { comments: req.params.comments_id }})  
    })
    .then(function(dbArticles) {
      res.send("comment deleted")
    })
    .catch(function(err) {
      res.json(err);
    });
  });

//Export routes for server.js to use
module.exports = router;
