var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var comicSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  thumbnail: { type: String, default: "" }
});

var listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comics: [comicSchema]
});

var userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
  lists: [listSchema]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
