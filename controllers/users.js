var User = require("../models/user");

module.exports = {
  index: index,
  show:  show
};

function index(req, res, next) {
  // User.find({}, function(err, users) {
  //   if (err) {
  //     res.json({message: err});
  //   } else {
  //     res.render('users/index', {users: users});
  //   }
  // });
}

function show(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.render('users/show', {user: user});
    }
  });
}
