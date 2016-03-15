var User = require('../models/user');

module.exports = {
  createList: createList,
  destroyList: destroyList,
  addComicToList: addComicToList,
  destroyComic: destroyComic,
  getUserLists: getUserLists
};

function createList(req, res, next) {
  var id = req.params.id;
  // var newList = req.params.body;
  User.find({ id: id}, function(error, user) {
    if(error) next(error);

    console.log(user);
    // user.lists.push(newList);
  });
}

function destroyList(req, res, next) {

}

function addComicToList(req, res, next) {
  var data = req.body; //data contains comic & user info
  // console.log(data);
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    var list = _user.lists.id(data.listId);
    console.log(list);
    console.log();
    list.comics.push({
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail
    });
    console.log(list);
    console.log(user);
    _user.save(function(error) {
      if (error) {
        console.log(error);
        next(error);
      }
      else {
        console.log('added comic!');
      }
    });
  });
}

function destroyComic(req, res, next) {

}

function getUserLists(req, res, next) {
  var id = req.params.id;
  // console.log('request: ' + req);
  User.find({ facebookId: id }, function(error, user) {
    // console.log(user[0]);
    res.send(user[0].lists);
  });
}
