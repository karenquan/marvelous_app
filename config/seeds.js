var mongoose = require('./database');
var User = require('../models/user');
var Character = require('../models/character');
var request = require('request');
var md5 = require('md5');

// var MARVEL_BASE_ENDPOINT = 'http://gateway.marvel.com',
//       MARVEL_PUBLIC_KEY = 'c3efb289a52afc7877c1772359aad41a';

var MARVEL_BASE_ENDPOINT = 'http://gateway.marvel.com',
    MARVEL_PUBLIC_KEY = 'c3efb289a52afc7877c1772359aad41a',
    allCharacters = [],
    uri,
    ts,
    hash;

// POPULATE DATABASE WITH ALL CHARACTERS WITH AVAILABLE COMICS
Character.remove({}, function(err) {
  if (err) console.log(err);

  // - make first initial call to grab the number of results
  ts = Date().toString();
  // --- NEED TO UPDATE & HIDE KEYS IN .ENV
  // var hash = md5(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY);
  var hash = md5(ts + '5dd8925717ff2e9c19813e80ee8b00448736fda0c3efb289a52afc7877c1772359aad41a');
  request({
    method: 'GET',
    uri: MARVEL_BASE_ENDPOINT + '/v1/public/characters?limit=100&ts=' + ts + '&apikey=c3efb289a52afc7877c1772359aad41a&hash=' + hash
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var characters = JSON.parse(response.body).data.results;
      var totalCharacters = JSON.parse(response.body).data.total;

      characters.forEach(function(character) {
        if (character.comics.available > 0) { //only add characters with available comics
          addCharacter(character);
        }
      });

      // BASED ON NUMBER OF CHARACTERS, DIVIDE BY 100 (API RESULT LIMIT IS 100) TO GET NUMBER OF ITERATIONS
      var numOfIterations = Math.ceil(totalCharacters / 100);
      var offset = 1;

      for(var i = 1; i <= numOfIterations; i++) {
        offset = i * 100;
        ts = Date().toString() + i.toString();
        hash = md5(ts + '5dd8925717ff2e9c19813e80ee8b00448736fda0c3efb289a52afc7877c1772359aad41a');
        uri = MARVEL_BASE_ENDPOINT + '/v1/public/characters?limit=100&offset=' + offset + '&ts=' + ts + '&apikey=c3efb289a52afc7877c1772359aad41a&hash=' + hash;

        request({
          method: 'GET',
          uri: uri
        }, function(error, response, body){
          if (!error && response.statusCode == 200) {
            var characters = JSON.parse(response.body).data.results;
            var totalCharacters = JSON.parse(response.body).data.total;
            // console.log(characters);

            characters.forEach(function(character) {
              if (character.comics.available > 0) { // ONLY ADD CHARACTERS WITH AVAILABLE COMICS
                addCharacter(character);
              }
            });

            // console.log(allCharacters.length);
          }//END success condition
        });//END of looped request
      } //END for loop
    } // END of success condition

    // mongoose.connection.close(function(err) {
    //   if (err) console.log(err);
    //   process.exit(0);
    // });
  });
});

function addCharacter(character) {
  var _character = new Character();
  _character.name = character.name;
  _character.id = character.id;
  _character.description = character.description;
  _character.thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension;
  allCharacters.push(_character);
  _character.save(function(newCharacter) {
  });
}

// var users = [
//   { // 0
//     handle: "DunkLord",
//     name:   "Bob Neverdunk"
//   },
//   { // 1
//     handle: "MoneyMarge",
//     name:   "Margaret Kalanchoe"
//   }
// ];

// User.remove({}, function(err) {
//   if (err) console.log(err);
//   User.create(users, function(err, users) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Database seeded with " + users.length  + " users.");
//       mongoose.connection.close(function(err) {
//         if (err) console.log(err);
//         process.exit(0);
//       });
//     }
//   });
// });
