var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  photos: {
    type: Array,
  }
  // nickname: {
  //   type: String,
  //   required: true 
  // },
  // photos: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Photos" //TODO: update to databasename provided by multer
  // }],
  // saved_photos: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Photos" //TODO: update to databasename provided by multer
  // }]
});

// This creates our model from the above schema, using mongoose's model method
var Users = mongoose.model("Users", UsersSchema);

// Export the Article model
module.exports = Users;
