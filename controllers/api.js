var User = require('../models/user');

module.exports = {
  createList: createList,
  destroyList: destroyList,
  addComicToList: addComicToList,
  destroyComic: destroyComic,
  updateListTitle: updateListTitle,
  getUserLists: getUserLists
};

function createList(req, res, next) {
  var data = req.body; //data contains user & list name
  console.log(data);
  User.find({ facebookId: data.facebookId }, function(error, user) {
    if(error) next(error);

    var _user = user[0];
    _user.lists.push({
      title: data.listName
    });

    _user.save(function(error) {
      if (error) {
        console.log(error);
        next(error);
      } else {
        console.log('added list!');
        console.log(_user.lists[_user.lists.length - 1]);
        res.send(_user.lists[_user.lists.length - 1]);
      }
    });
  });
}

function destroyList(req, res, next) {
  var data = req.body; //contains list & user info
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    _user.lists.id(data.listId).remove();
    _user.save(function(error) {
      if (error) {
        console.log(error);
        next(error);
      } else {
        console.log('removed list!');
        res.send();
      }
    });
  });
  console.log(data);
}

function addComicToList(req, res, next) {
  var data = req.body; //data contains comic & user info
  // console.log(data);
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    var list = _user.lists.id(data.listId);
    list.comics.push({
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail
    });
    // console.log(list);
    _user.save(function(error) {
      if (error) {
        console.log(error);
        next(error);
      } else {
        console.log('added comic!');
        res.send();
      }
    });
  });
}

function destroyComic(req, res, next) {
  var data = req.body; //data contains comic & user info
  // console.log(data);
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    var list = _user.lists.id(data.listId);
    list.comics.id(data.comicId).remove();
    _user.save(function(error) {
      if(error) {
        console.log(error);
        next(error);
      } else {
        console.log('removed comic!');
        res.send();
      }
    });
    console.log(list.comics.id(data.comicId));
  });
}

function updateListTitle(req, res, next) {
  var data = req.body;
  // console.log(data);
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    var list = _user.lists.id(data.listId);
    list.title = data.listTitle;

    _user.save(function(error) {
      if(error) {
        console.log(error);
        next(error);
      } else {
        console.log('removed comic!');
        res.send();
      }
    });
  });
}

function getUserLists(req, res, next) {
  var id = req.params.id;
  // console.log('request: ' + req);
  User.find({ facebookId: id }, function(error, user) {
    // console.log(user[0]);
    res.send(user[0].lists);
  });
}
