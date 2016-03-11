var _ = require('lodash');

var localEnvVars = {
  TITLE:      'marvelous_app',
  SAFE_TITLE: 'marvelous_app'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
