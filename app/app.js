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
  var getDeckId = function (el) {
    return $(el).data('id');
  }
  var setDeckId = function (el, id) {
    $(el).data('id', id);
  }
  var parseDeck = function (card) {
    return JSON.parse(card);
  }
  var stringifyDeck = function (card) {
    return JSON.stringify(card);
  }
  var getDeck = function (id) {
    return window.localStorage.getItem(id)
  }

  var showDecks = function () {
    $('.cards').empty();
    for (var i = 0; i < window.localStorage.length; i++) {
      if (window.localStorage.key(i).includes('deck+')) {

        var $card = $('<div class="card m-2 w-25" ></div>');
        var $cardbody = $('<div class="card-body"></div>');
        var $cardtext = $('<div class="card-text"></div>');
        var $addcard = $('<button type="button" class="btn btn-light mt-2">Add Card</button>');
        var $takequiz = $('<button type="button" class="btn btn-light mt-2">Take Quiz</button>');

        var key = window.localStorage.key(i);
        var deck = parseDeck(getDeck(key))
        var topic = Object.keys(deck);

        $addcard.attr('data-id', key);
        $addcard.attr('data-toggle', 'modal');
        $addcard.attr('data-target', '#showcardmodal');

        $takequiz.attr('data-id', key);
        $takequiz.attr('data-toggle', 'modal');
        $takequiz.attr('data-target', '#takequizmodal');

        $cardbody.text(topic);
        $cardbody.appendTo($card);

        $cardtext.text(`cards: ` + deck[topic].length);
        $cardtext.appendTo($cardbody);
        $addcard.appendTo($cardbody);
        $takequiz.appendTo($cardbody);
        $card.appendTo($('.cards'));
      }
    }
  }
  var showCard = function (event, $modal) {
    var $element = $(event.relatedTarget);  // element that triggered the modal
    var id = getDeckId($element);
    var card = parseDeck(getItem(id));
    var topic = Object.keys(card);
    var cardcount = ' total: ' + card[topic].length;
    $modal.find('.modal-title').text(`Flashcard: ${topic} ${cardcount}`);

    var $button = $modal.find('.modal-footer button#add')
    $($button).data('id', id);
  }
  var addCard = function ($modal) {
    //TODO: add field validation
    var id = getDeckId($modal);
    var deck = parseDeck(getItem(id));
    var card = {
      'question': getCardQuestion(),
      'answer': getCardAnswer()
    };
    var keys = Object.keys(deck);
    deck[keys[0]].push(card);

    updateItem(id, stringifyDeck(deck));
    resetInputs();
    showDatabaseContents();
    showDecks();
  }

  var showQuiz = function (event, $modal) {
    console.log(' show quiz ', event, $modal);
    var $element = $(event.relatedTarget);  // element that triggered the modal
    var id = getDeckId($element);
    var card = parseDeck(getItem(id));
    var topic = Object.keys(card);
    var cardcount = ' total: ' + card[topic].length;
    var question = `Question: ${card[topic][0].question}`;
    var answer = `Answer: ${card[topic][0].answer}`;
    var $qDiv = $('<div class="question"></div>');
    var $aDiv = $('<div class="answer"></div>');
    $qDiv.text(question);
    $aDiv.text(answer);
    $modal.find('.modal-title').text(`Flashcard: ${topic} ${cardcount}`);
    $modal.find('.modal-body').empty().append($qDiv).append($aDiv);
  }

  $("#takequizmodal").on('show.bs.modal', function (event) {
    showQuiz(event, $(this))
  });
  $("#showcardmodal").on('show.bs.modal', function (event) {
    showCard(event, $(this))
  });

  $("#showcardmodal").on('click', 'button', function (event) {
    addCard($(this))
  });

  $('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $('.deck-topic').click(function () {
    //TODO: add field validation check for input
    var topic = getDeckTopicInput();
    var deck = {};
    deck[topic] = [];
    createItem(generateDeckId(), stringifyDeck(deck));
    resetInputs();
    showDecks();
  });

  showDatabaseContents();
  showDecks();

});

