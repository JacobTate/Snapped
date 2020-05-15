var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    unique: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Tags = mongoose.model("Tags", TagsSchema);

// Export the Article model
module.exports = Tags;
