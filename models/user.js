var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var comicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  thumbnail: { type: String, default: "" }
});

var favoritesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comics: [comicSchema]
});

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  facebookId: { type: Number, required: true },
  favorites: [favoritesSchema]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
