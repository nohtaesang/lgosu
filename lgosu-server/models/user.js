var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  nickname: String,
  published_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", userSchema);
