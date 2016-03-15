var Main = (function() {

// VARIABLES -------------------------------------------------------------------
  var $characters,
      $characterSearchResults,
      $characterTemplateString,
      renderCharacterTemplate,
      renderedCharacterTemplate,
      $userListOptionTemplate,
      renderedUserListOption,
      $searchButton = $('#searchButton'),
      offset,
      allCharacters = [];

  var MARVEL_BASE_ENDPOINT = 'http://gateway.marvel.com:80/v1/public/',
      MARVEL_PUBLIC_KEY = 'c3efb289a52afc7877c1772359aad41a';


//TEMPLATE DATA ----------------------------------------------------------------
  $characters = $("#characters");
  $characterSearchResultsContainer = $('#characterSearchResults');
  $characterSearchResults = $('#characterSearchResults .results');
  $characterTemplateString = $('#characterTemplate').html();
  renderCharacterTemplate = _.template($characterTemplateString);
  $userListOptionTemplate = $('#userListOptionTemplate').html();
  renderUserListOptionTemplate = _.template($userListOptionTemplate);

// CORE  -----------------------------------------------------------------------
  var _core = function() {
    loadUsersLists();

    // EVENT HANDLERS ----------------------------------------------------------
    $searchButton.on('click', function(e) {
      $('body.home').css('overflow', 'visible');
      $characterSearchResultsContainer.removeClass('hide');
      $('#characterSearchResults .results').empty();
      searchForCharactersByName($('#characterNameInput').val());
      var resultsOffset = $('#characterSearchResults').offset();
      $('body').animate({
        scrollTop: resultsOffset.top - $('nav').height()
      }); //scroll top animation to display search results
    });

    $('#characterNameInput').val('').focus();
    $searchButton.attr('disabled', true); //disabled by default
    //only allow search button to be clicked when user has input text
    $('#characterNameInput').on('keypress keyup', function(e) {
      if($('#characterNameInput').val().length > 0) {
        $searchButton.removeClass('disabled');
        $searchButton.attr('disabled', false);
      } else {
        $searchButton.addClass('disabled');
        $searchButton.attr('disabled', true);
      }
    });

    // ADD LOADING GIF
    $('#characters a, .comic').on('click', function(e) {
      $('body').addClass('loading');
    });

    // ADD COMIC TO LIST
    $('#addComicToList').on('click', function(e) {
        //var userFacebookId = CURRENT_USER_FB_ID;
        var userFacebookId = 1; //TEST
        var selectedListId = $('#userLists').find(":selected").data('id');
        var data = {
          id: $('.comic-info').data('id'),
          title: $('.comic-title').html(),
          description: $('.comic-description').length ? $('.comic-description').html() : "",
          thumbnail: $('img.comic-thumbnail').attr('src'),
          facebookId: userFacebookId,
          listId: selectedListId
        };
        // console.log(JSON.stringify(comic));
        $.ajax({
            method: 'POST',
            url: '/users/' + userFacebookId + '/lists/' + selectedListId + '/comics',
            data: data
        }).then(function(comic) {
            console.log('added comic? plz?');
            console.log(comic);
        });
    });

    // AJAX --------------------------------------------------------------------
    function searchForCharactersByName(name) {
        $.ajax({
          url: '/characters/search/' + encodeURIComponent(name),
          method: 'GET',
          dataType: 'json'
        }).then(function(characters) {
          $('.result-count').html(characters.length);
          $('#characterSearchResults .character-name').html(name);
          characters.forEach(function(character) {
            $characterSearchResults.append(renderCharacter(character));
          });
          $('.character-item h2, .character-item img').on('click', function() {
            $('body').addClass('loading');
          }); //add loading gif while next page loads
        }, logErrors);
    }

    function loadUsersLists() { //on comic show page
      $.ajax({
          url: '/users/1/lists', //need to grab dynamic facebookId
          method: 'GET'
      }).then(function(lists) {
        if(lists.length > 0) { //if user has any lists, display them as a dropdown
          lists.forEach(function(list) {
            // console.log(list._id);
            $('#userLists').append(renderUserListOptionTemplate(list));
          });
          //unhide list if they have any lists
          $('.add-to-list').removeClass('hide');
        }
      }, logErrors);
    }
  }; //END _core()

  // HELPERS -------------------------------------------------------------------
  function renderCharacter(character) {
    return renderedCharacterTemplate = renderCharacterTemplate(character);
  } //END renderCharacter()

  function parseCharacter(character) {
    var _character = {};
      _character.name = character.name;
      _character.id = character.id;
      _character.description = character.description;
      _character.thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension;

    return _character;
  } //END parseCharacter()

  function logSuccess(data) {
    console.log("Success: ", data);
    return data; // Return the data so that it is in the
                 // next #then in the chain!
  } //END logSuccess

  function logErrors(err) {
    console.log("Failure: ", err);
  } //END logErrors

  // SEED ALL CHARACTERS -------------------------------------------------------
  var _seedCharacters = function() {

    getCharacters();

    function getCharacters() { // GET ALL CHARACTERS SINCE API MAX RETURN IS 100 RESULTS

      $.when(
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=100&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=200&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=300&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=400&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=500&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=600&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=700&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=800&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=900&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=1000&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=1100&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=1200&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=1300&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=1400&apikey=' + MARVEL_PUBLIC_KEY),
        $.ajax(MARVEL_BASE_ENDPOINT + 'characters?' + 'limit=100&offset=1500&apikey=' + MARVEL_PUBLIC_KEY)
        )
      .done(function(one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen){
        //add returned characters to allCharacters array
        parseAllCharactersResults(one);
        parseAllCharactersResults(two);
        parseAllCharactersResults(three);
        parseAllCharactersResults(four);
        parseAllCharactersResults(five);
        parseAllCharactersResults(six);
        parseAllCharactersResults(seven);
        parseAllCharactersResults(eight);
        parseAllCharactersResults(nine);
        parseAllCharactersResults(ten);
        parseAllCharactersResults(eleven);
        parseAllCharactersResults(twelve);
        parseAllCharactersResults(thirteen);
        parseAllCharactersResults(fourteen);
        parseAllCharactersResults(fifteen);

        console.log('total num of characters: ' + allCharacters.length);

        //SEED DATABASE WITH ALL CHARACTERS
        allCharacters.forEach(function(character, i) {
          seedCharacter(character);
        });
      })
      .fail(function(error) {
        console.log(error);
      });
    }

    function parseAllCharactersResults(charactersResults) {
      var returnedCharacters = charactersResults[0].data.results;

      returnedCharacters.forEach(function(character) {
        if (character.comics.available > 0) { //only add characters with available comics
          var _character = parseCharacter(character);
          renderCharacter(_character);
          allCharacters.push(_character);
        }
      });
    }

    function seedCharacter(character) {
      $.ajax({
        url: '/characters',
        method: 'POST',
        dataType: 'json',
        data: character
      }).then(function() { console.log('added ' + character.name); }, logErrors);
    }
  }; // END _seedCharacters()

  var _init = function() {
    //_seedCharacters(); //for testing while server side seeding doesn't work. uncomment & run to update database with the most recent characters.
    _core();
  };

  return {
    init: _init
  }
})();

$(document).ready(function() {
  Main.init();
}).ajaxStart(function() {
  $('body').addClass('loading');
}).ajaxComplete(function() {
  $('body').removeClass('loading');
});
