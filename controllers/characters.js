var Character = require('../models/character');
var request = require('request');
var md5 = require('md5');

module.exports = {
  index: index,
  show: show
};

function index(req, res, next) {
  Character.find({}, function(error, characters) {
    //FILTER CHARACTERS BY FIRST LETTER
    var alphabet = ['3','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var currentList = [];
    var sortedCharacters = [];
    alphabet.forEach(function(letter) {
      currentList = [];
      currentList.push(letter);
      characters.forEach(function(character) {
        if (character.name.charAt(0).toLowerCase() === letter) {
          currentList.push(character);
        }
      });
      sortedCharacters.push(currentList);
    });
    res.render('characters/index', { letters: alphabet, total: characters.length, sortedCharacters: sortedCharacters, user: req.user });
  });
}

function show(req, res, next) {
  //use id to search for character's comics in marvel's database
  var id = req.params.id;
  var character;

  Character.find({ id: id }, function(error, returnedCharacter) {
    if(error) next(error);

    character = returnedCharacter[0];
    var ts   = Date.now();
    var hash = md5(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY);
    var uri  = 'http://gateway.marvel.com/v1/public/characters/' + id + '/comics?limit=50&ts=' + ts + '&apikey='+process.env.MARVEL_PUBLIC_KEY+'&hash=' + hash;
    //GRAB COMICS
    request({
      method: 'GET',
      uri:    uri,
      timeout: 119000
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var comics = JSON.parse(response.body).data.results;

        var parsedComics = [];
        comics.forEach(function(comic) {
          var _comic = {};
          _comic.id = comic.id;
          _comic.title = comic.title;
          _comic.description = comic.description;
          _comic.thumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;
          parsedComics.push(_comic);
        });

        //add object of comics to view
        res.render('characters/show', { character: character, comics: parsedComics, user: req.user });
      } else if (error) {
       next(error);
     } else {
      var errObject = {
        message: "Unknown status code received...",
        status:  response.statusCode,
        body:    body,
        hash:    hash,
        uri:     uri
      }
      next(errObject);
     }
    });
  });
}

