var User = require('../models/user');

module.exports = {
  createList: createList,
  destroyList: destroyList,
  createComic: createComic,
  destroyComic: destroyComic,
  getUserLists: getUserLists
};

function createList(req, res, next) {
  var id = req.params.id;

  User.find({ id: id}, function(error, user) {
    if(error) next(error);

    console.log(user);
  });
}

function destroyList(req, res, next) {

}

function createComic(req, res, next) {

}

function destroyComic(req, res, next) {

}

function getUserLists(req, res, next) {
  var id = req.params.id;
  console.log('request: ' + req);
  User.find({ facebookId: id }, function(error, user) {
    console.log(user[0]);
    res.send(user[0].lists);
  });
}
