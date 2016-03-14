var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var characterSchema = new mongoose.Schema({
  name:        { type: String, default: "" },
  id:          { type: Number, default: 0 },
  description: { type: String, default: "" },
  thumbnail:   { type: String, default: "" }
});

var Character = mongoose.model('Character', characterSchema);

module.exports = Character;
