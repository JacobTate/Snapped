var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Articles = mongoose.model("Articles", ArticlesSchema);

// Export the Article model
module.exports = Articles;
