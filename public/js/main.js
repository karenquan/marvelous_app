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
      $addListButton = $('#addListButton'),
      $addListInput = $('#addListInput'),
      $updateListTitleInput = $('#updateListTitleInput'),
      $updateListTitleButton = $('#updateListTitleButton'),
      offset,
      deleteItem = false,
      allCharacters = [],
      CURRENT_USER_FB_ID = $('.userName').length > 0 ? $('.userName').data('fb-id') : 0; //UPDATE THIS WITH DYNAMIC FB ID

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
    backToTop();

    // EVENT HANDLERS ----------------------------------------------------------

    // HOME PAGE SEARCH INPUT
    disableButtonUntilInput($('#characterNameInput'), $searchButton);
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

    // ADD LOADING GIF
    $('#characters .results a, .comic a').on('click', function(e) {
      $('body').addClass('loading');
    });

    // MODAL CLOSE
    $('.modal .close, .modal .no').on('click', function() {
      $('.modal').addClass('hide');
      $('#yesButton').removeClass();
      $('#yesButton').addClass('button').addClass('yes');
    });

    // CHARACTERS INDEX
    $('.letters a').on('click', function(e) {
      e.preventDefault();
      var $letter = $(this).attr('href');
      var $letterOffset = $($letter).offset();
      $('body').animate({
        scrollTop: $letterOffset.top - $('nav').height()
      });
    });

    // BACK TO TOP ANIMATION
    function backToTop() {
      $("#backToTop").hide();

      $(function () { // fade arrow back in
        $(window).scroll(function () {
          if ($(this).scrollTop() > 150) {
            $('#backToTop').fadeIn('slow');
          } else {
            $('#backToTop').fadeOut('slow');
          }
        });

        // scroll body to 0px on click
        $('#backToTop').on('click', function (e) {
          e.preventDefault();
          $('body').animate({
            scrollTop: 0
          }, 800);
        });
      });
    }

    // AJAX --------------------------------------------------------------------

    // SEARCH FOR CHARACTER BY NAME (HOME PAGE)
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

    // LOAD USER LISTS DROPDOWN ON COMIC SHOW PAGE
    function loadUsersLists() {
      if(CURRENT_USER_FB_ID > 0) {
        $.ajax({
            url: '/users/' + CURRENT_USER_FB_ID + '/lists',
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
    }

    // ADD LIST
    disableButtonUntilInput($addListInput, $addListButton);
    $("#addListButton").on('click', function(e) {
      var listName = $('#addListInput').val();
      var data = {
        facebookId: CURRENT_USER_FB_ID,
        listName: listName
      };
      $.ajax({
        method: 'POST',
        url: '/users/' + CURRENT_USER_FB_ID + '/lists',
        data: data
      }).done(function(list) {
        location.reload();
        disableButtonUntilInput($addListInput, $addListButton);
        // console.log(list);
        var $newList = $('<div />', { 'class': 'list' }); //visually add new list section
          var $title = $('<h3 />', { text: listName });
        $newList.append($title);
        $('.comic-lists').append($newList);
      });
    });

    // ADD COMIC TO LIST
    $('#addComicToList').on('click', function(e) {
      var selectedListId = $('#userLists').find(":selected").data('id');
      var data = {
        id: $('.comic-info').data('id'),
        title: $('.comic-title').html(),
        description: $('.comic-description').length ? $('.comic-description').html() : "",
        thumbnail: $('img.comic-thumbnail').attr('src'),
        facebookId: CURRENT_USER_FB_ID,
        listId: selectedListId
      };
      $.ajax({
          method: 'POST',
          url: '/users/' + CURRENT_USER_FB_ID + '/lists/' + selectedListId + '/comics',
          data: data
      }).done(function() {
        var $successElement, $addToListContainer, comicTitle, listTitle, $successText;
        $addToListContainer = $('.add-to-list');
        comicTitle = $('.comic-info h1').html();
        listTitle = $('#userLists').find(":selected").val();
        $successText = 'You added ' + comicTitle + ' to your ' + listTitle + ' list!';
        var $successElement = $('<p />', { html: $successText });
        $addToListContainer.append($successElement);
        $successElement.fadeIn("slow").delay(5000).fadeOut('slow');
      });
    });

    //DELETE COMIC FROM LIST
    // $('.comic-lists').delegate('.removeComic', 'click', function(e) {
    //   console.log('delete comic click');
    //   var $comicContainer = $(this).parents('.comic')[0];
    //   var $listId = $(this).parents('.list').data('id');
    //   var $title = $($(this).parents('.comic')[0]).data('title');
    //   var $comicId = $($(this).closest('div')[0]).data('id');
    //   var data = {
    //     title: $title,
    //     facebookId: CURRENT_USER_FB_ID,
    //     listId: $listId,
    //     comicId: $comicId
    //   };

    //   $.ajax({
    //     method: 'DELETE',
    //     url: '/users/' + CURRENT_USER_FB_ID + '/lists/' + $listId + '/comics/' + $comicId,
    //     data: data
    //   }).then(function(comic) {
    //     $comicContainer.remove(); //remove comic from dom
    //     $('.modal').addClass('hide');
    //   });
    // });

    // REMOVE COMIC
    $('.comic-lists').delegate('.removeComic', 'click', function(e) {
      console.log('delete comic click');
      var $comicContainer = $(this).parents('.comic')[0];
      var $listId = $(this).parents('.list').data('id');
      var $title = $($(this).parents('.comic')[0]).data('title');
      var $comicId = $($(this).closest('div')[0]).data('id');
      var data = {
        title: $title,
        facebookId: CURRENT_USER_FB_ID,
        listId: $listId,
        comicId: $comicId
      };

      displayModal('list', $title);
      $('#yesButton').on('click', function() {
        console.log('hmm');
        removeComic($comicContainer, $listId, $comicId, data);
        $('#yesButton').unbind('click'); // NECESSARY SO OLD LISTS DON'T PILE UP IN CLICK EVENT
      });
    });

    function removeComic(comicContainer, listId, comicId, data) {
      console.log('trying to delete comic ' + data.title + ' (' + data.comicId + ')');
      $.ajax({
        method: 'DELETE',
        url: '/users/' + CURRENT_USER_FB_ID + '/lists/' + listId + '/comics/' + comicId,
        data: data
      }).then(function() {
        console.log('deleted comic ' + data.title + ' (' + data.comicId + ')');
        comicContainer.remove(); //remove comic from dom
        $('.modal').addClass('hide');
      });
    }

    // function deleteComic(comicContainer, listId, comicId, data) {
    //   $.ajax({
    //     method: 'DELETE',
    //     url: '/users/' + CURRENT_USER_FB_ID + '/lists/' + listId + '/comics/' + comicId,
    //     data: data
    //   }).then(function(comic) {
    //     console.log('delete comic ' + data.title);
    //     comicContainer.remove(); //remove comic from dom
    //     $('.modal').addClass('hide');
    //   });
    // }


    //DELETE A LIST (DELEGATE METHOD)
    // $('.list').delegate('.removeList', 'click', function(e) {
    //   e.preventDefault();
    //   var $listContainer = $(this).parents('.list');
    //   var $title = $listContainer.find('h3').html();
    //   var $listId = $listContainer.data('id');
    //   var data = {
    //     title: $title,
    //     facebookId: CURRENT_USER_FB_ID,
    //     listId: $listId
    //   };

    //   $.ajax({
    //       method: 'DELETE',
    //       url: '/users/' + CURRENT_USER_FB_ID + '/lists/' + $listId,
    //       data: data
    //     }).then(function() {
    //       $listContainer.remove(); //remove list from dom
    //       $('.modal').addClass('hide');
    //     });
    // });

    // REMOVE LIST
    $('.list').delegate('.removeList', 'click', function(e) {
      e.preventDefault();
      var $listContainer = $(this).parents('.list');
      var $title = $listContainer.find('h3').html();
      var $listId = $listContainer.data('id');
      console.log('click event - delete list ' + $title + ' (' + $listId + ')');
      var data = {
        title: $title,
        facebookId: CURRENT_USER_FB_ID,
        listId: $listId
      };

      displayModal('list', $title);
      $('#yesButton').on('click', function() {
        console.log('hmm');
        removeList($listContainer, $listId, data);
        $('#yesButton').unbind('click'); // NECESSARY SO OLD LISTS DON'T PILE UP IN CLICK EVENT
      });
    });

    function removeList(listContainer, listId, data) {
      console.log('trying to delete list ' + data.title + ' (' + data.listId + ')');
      $.ajax({
        method: 'DELETE',
        url: '/users/' + CURRENT_USER_FB_ID + '/lists/' + listId,
        data: data
      }).then(function() {
        console.log('deleted list ' + data.title + ' (' + data.listId + ')');
        listContainer.remove(); //remove list from dom
        $('.modal').addClass('hide');
      });
    }

    // UPDATE LIST TITLE
    $('.user-actions').delegate('.updateList', 'click', function(e) {
      e.preventDefault();
      var $inputContainer = $(this).siblings('.user-input');
      var $updateSubmitButton = $(this).siblings('.user-input').children('.updateListTitleButton');
      var $listTitle = $(this).parents('.list').find('h3');
      var listId = $(this).parents('.list').data('id');

      $inputContainer.removeClass('hide');

      $updateSubmitButton.on('click', function() {
        var $userTitle = $(this).siblings('.updateListTitleInput').val();
        if ($userTitle.length > 0) { //only submit if input is not empty
          var data = {
            facebookId: CURRENT_USER_FB_ID,
            listId: listId,
            listTitle: $userTitle
          };

          $.ajax({
            method: 'PUT',
            url: '/users/' + CURRENT_USER_FB_ID + '/lists/' + listId,
            data: data
          }).then(function(error, title) {
            $inputContainer.addClass('hide'); // hide update input
            $listTitle.html($userTitle); //update list title in dom
          });
        }
      });
    });
  }; //END _core()

  // HELPERS -------------------------------------------------------------------
  function displayModal(type, item) {
    var text = type === 'comic' ? 'Are you sure you want to delete the comic, ' + item + '?' : 'Are you sure you want to delete the list, ' + item + '?';
    $('.modal p').html(text);
    $('span.yes').addClass(type);
    $('.modal').removeClass('hide');
  }

  function disableButtonUntilInput(input, button) {
    input.val('').focus();
    button.attr('disabled', true); //disabled by default
    //only allow search button to be clicked when user has input text
    input.on('keypress keyup', function(e) {
      if(input.val().length > 0) {
        button.removeClass('disabled');
        button.attr('disabled', false);
      } else {
        button.addClass('disabled');
        button.attr('disabled', true);
      }
    });
  }

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

    function getCharacters() { // MARVEL API RESULT LIMIT IS 100
      var offset = 1300; //update offset with whatever offset you want

      $.ajax({
        method: 'GET',
        url: MARVEL_BASE_ENDPOINT + 'characters?limit=100&offset=' + offset + '&apikey=' + MARVEL_PUBLIC_KEY
      }).then(function(characters) {
          var _characters = characters.data.results;
          _characters.forEach(function(character) {
            if (character.comics.available > 0) { //only add characters with available comics
              var _character = parseCharacter(character);
              renderCharacter(_character);
              allCharacters.push(_character);
            }
          });
          console.log(JSON.stringify(allCharacters));
          console.log(allCharacters.length);
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
