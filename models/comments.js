var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  body: String
});

var Comments = mongoose.model("Comments", CommentsSchema);

// Export the Comments model
module.exports = Comments;
