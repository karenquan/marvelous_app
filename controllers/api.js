var User = require('../models/user');
var Character = require('../models/character');

module.exports = {
  createList: createList,
  destroyList: destroyList,
  addComicToList: addComicToList,
  destroyComic: destroyComic,
  updateListTitle: updateListTitle,
  getUserLists: getUserLists,
  search: characterSearch
};

function createList(req, res, next) {
  var data = req.body; //data contains user & list name
  User.find({ facebookId: data.facebookId }, function(error, user) {
    if(error) next(error);

    var _user = user[0];
    _user.lists.push({
      title: data.listName
    });

    _user.save(function(error) {
      if (error) {
        next(error);
      } else {
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
        next(error);
      } else {
        res.send();
      }
    });
  });
}

function addComicToList(req, res, next) {
  var data = req.body; //data contains comic & user info
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    var list = _user.lists.id(data.listId);
    list.comics.push({
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail
    });
    _user.save(function(error) {
      if (error) {
        next(error);
      } else {
        res.send();
      }
    });
  });
}

function destroyComic(req, res, next) {
  var data = req.body; //data contains comic & user info
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    var list = _user.lists.id(data.listId);
    list.comics.id(data.comicId).remove();
    _user.save(function(error) {
      if(error) {
        next(error);
      } else {
        res.send();
      }
    });
  });
}

function updateListTitle(req, res, next) {
  var data = req.body;
  User.find({ facebookId: data.facebookId }, function(error, user) {
    var _user = user[0];
    var list = _user.lists.id(data.listId);
    list.title = data.listTitle;

    _user.save(function(error) {
      if(error) {
        next(error);
      } else {
        res.send();
      }
    });
  });
}

function getUserLists(req, res, next) {
  var id = req.params.id;
  User.find({ facebookId: id }, function(error, user) {
    res.send(user[0].lists);
  });
}

function characterSearch(req, res, next) {
  var characterName = decodeURI(req.params.name);
  Character.find({ name: { $regex: new RegExp("^" + characterName, "i") } }, function(error, characters) {
    if(error) next(error);
    else {
      res.json(characters);
    }
  });
}
