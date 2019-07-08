$.getScript('./app/localstoragemanager.js', function () {

  showDatabaseContents();
  var getLocalStorageLength = function () {
    return window.localStorage.length;
  }
  var getDeckId = function () {
    return 'deck' + getLocalStorageLength() + 1;
  }
  var getDeckTopicInput = function () {
    return $('.topic').val();
  }
  $('.deck-topic').click(function () {

    createItem(getDeckId(), getDeckTopicInput());
    showDatabaseContents();
  });
});

