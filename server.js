// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Port
var PORT = process.env.PORT || 3000;

// Require Models 

// Init Express
var app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


// Mongo connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scraperDB", { useNewUrlParser: true })

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./controllers/controllers.js")(app);

// Start server
app.listen(PORT, function() {
    console.log("App running on PORT: " + PORT);
});
