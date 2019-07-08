$.getScript('./app/localstoragemanager.js', function () {
  var getLocalStorageLength = function () {
    return window.localStorage.length;
  }
  var getDeckId = function () {
    return 'deck+' + getLocalStorageLength();
  }
  var getDeckTopicInput = function () {
    return $('.topic').val();
  }
  var showDecks = function () {
    $('decks').html('');
    for (var i = 0; i < window.localStorage.length; i++) {
      if (window.localStorage.key(i).includes('deck+')) {
        var key = window.localStorage.key(i);
        $('.decks').append(
          `<div class="card m-2">
          <div class="card-body">${window.localStorage.getItem(key)}</div>
          </div>`)
      }
    }
  }
  var formatDeckJSON = function (id) {
    var json = {};
    json[id] = [];
    return json;
  }

  $('.deck-topic').click(function () {
    //TODO: add in validation check for input
    createItem(getDeckId(), formatDeckJSON(getDeckTopicInput()));
    showDatabaseContents();
    showDecks();
    resetInputs();
  });

  showDatabaseContents();
  showDecks();

});

