// Model for articles
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  note: 
    {
    type: Schema.Types.ObjectId,
    ref: "Note"
    } 
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;