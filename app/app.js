$.getScript('./app/localstoragemanager.js', function () {

  var resetInputs = function () {
    $('.topic').val('');
    $('.question').val('');
    $('.answer').val('');
  }
  var getLocalStorageLength = function () {
    return window.localStorage.length;
  }
  var generateDeckId = function () {
    return 'deck+' + getLocalStorageLength();
  }
  var getDeckTopicInput = function () {
    return $('.topic').val();
  }
  var getCardQuestion = function () {
    return $('.question').val();
  }
  var getCardAnswer = function () {
    return $('.answer').val();
  }
  var getDeckId = function(el) {
    return $(el).attr('data-id');
  }
  var setDeckId = function(el, id) {
    $(el).attr('data-id', id);
  }
  var formatDeckTopicJSON = function (id) {
    var json = {};
    json[id] = [];
    return JSON.stringify(json);
  }


  var showDecks = function () {
    $('.cards').html('');
    for (var i = 0; i < window.localStorage.length; i++) {
      if (window.localStorage.key(i).includes('deck+')) {
        var $card = $('<div class="card m-2 w-25"></div>');
        var $cardbody = $('<div class="card-body"></div>');
        var $cardtext = $('<div class="card-text"></div>');
        var key = window.localStorage.key(i);
        $card.attr('data-id', key);
        var deck = JSON.parse(window.localStorage.getItem(key))
        var value = Object.keys(deck);
        $cardbody.text(value);
        $cardbody.appendTo($card);

        $cardtext.text(`cards: ` + deck[value].length );
        $cardtext.appendTo($cardbody);
        $card.appendTo($('.cards'));
      }
    }
  }
  $('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
  $('.deck-topic').click(function () {
    //TODO: add field validation check for input
    createItem(generateDeckId(), formatDeckTopicJSON(getDeckTopicInput()));
    resetInputs();
    showDecks();
  });

  $('.cards').on('click', '.card.m-2', function (event) {
    var id =  getDeckId($(this));
    setDeckId($('.quanda'),id);
    $(".card-fields").show();
  });

  $('.quanda').click(function () {
    //TODO: add field validation
    var id = getDeckId($('.quanda'));
    var deck = JSON.parse(getItem(id));
    var card = {
      'question': getCardQuestion(),
      'answer': getCardAnswer()
    };
    var keys = Object.keys(deck);
    deck[keys[0]].push(card);

    updateItem(id, JSON.stringify(deck));
    resetInputs();
    showDatabaseContents();
    showDecks();
    $(".card-fields").hide();

  })

  showDatabaseContents();
  showDecks();

});

