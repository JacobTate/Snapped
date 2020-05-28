var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TagsSchema = new Schema({
tag: {
  type: String,
  required: true,
  unique: true
},
images: {
  type: Array,
  unique: true
}
});

// This creates our model from the above schema, using mongoose's model method
var ActivityTags = mongoose.model("activityTags", TagsSchema);

// Export the Article model
module.exports = ActivityTags;