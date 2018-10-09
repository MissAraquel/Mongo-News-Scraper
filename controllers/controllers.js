var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");

module.exports = function(app) {
  // GET route for scraping espn fantasy football
  app.get("/scrape", function(req, res) {

    axios.get("http://www.espn.com/fantasy/football/").then(function(response) {

      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);
      // empty result obj
      var result = {};

      $(".item-info-wrap").each(function(i, element) {
        // add text and href and save them into result obj
        result.title = $(element).find("h1").text();
        result.link = $(element).find("h1").children().attr("href");
        result.summary = $(element).find("p").text();
        //create new Article with result obj from scraping
        db.Article.create(result)
        .then(function(dbArticle) {
          //log result
          console.log(dbArticle);
        })
        .catch(function(err) {
          return res.json(err);
        });
      });
      //tells client that scrape was sucessfull
      res.send("Scrape Complete!");
    });
  });

  //renders index
  app.get("/", function(req, res) {
    res.render("index");
  })

  
  app.get("/articles", function(req, res) {
    //finds all articles from database
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        return res.json(err);
      });
  });

  //route to grab each article by id and populate it with a note
  app.get("/articles/:id", function(req, res) {
    //grabs article with unique id 
    db.Article.findOne({ _id: req.params.id })
    //adds note
    .populate("note")
    .then(function(dbArticle) {
      console.log(dbArticle);
      res.json(dbArticle);
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  //route to add note to article
  app.post("/products/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote}}, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
  }); 
};