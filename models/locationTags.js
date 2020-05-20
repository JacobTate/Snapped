var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TagsSchema = new Schema({
location: {
  type: String,
  required: true,
  unique: true
},
images: {
  type: Array
}
});

// This creates our model from the above schema, using mongoose's model method
var LocationTags = mongoose.model("locationTags", TagsSchema);

// Export the Article model
module.exports = LocationTags;
