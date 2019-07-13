var resetInputs = function () {
  $('.topic').val('');
  $('.question').val('');
  $('.answer').val('');
  $('.key').val('');
  $('.value').val('');

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
      if (deck[topic].length === 0) {
        $takequiz.attr('disabled', 'true');
      }

      $addcard.attr('data-id', key);
      $addcard.attr('data-toggle', 'modal');
      $addcard.attr('data-target', '#showcardmodal');

      $takequiz.attr('data-id', key);
      $takequiz.attr('data-toggle', 'modal');
      $takequiz.attr('data-target', '#takequizmodal');

      $cardbody.text(topic);
      $cardbody.appendTo($card);

      $cardtext.text(`Cards: ` + deck[topic].length);
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
  $modal.find('.modal-title').text(`Flashcard: ${topic}`);

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
  var $element = $(event.relatedTarget);  // element that triggered the modal
  var id = getDeckId($element);
  var card = parseDeck(getItem(id));
  var topic = Object.keys(card);
  var cardcount = ' total: ' + card[topic].length;
  $modal.find('.modal-title').text(`Flashcard: ${topic} ${cardcount}`);
  /// questions
  var $parentDiv = $('<form id="quizform" class="Q&A"></form>');

  card[topic].map(function (item, i) {
    var $qDiv = $('<div class="question"></div>');
    var $aDiv = $('<div class="answr"></div>');
    var $hideAnswer = $('<div class="show_hide" onclick="show()">Show Answer</div><br />');
    var $true = $('<input type="radio" checked value="true"> <label>True</label>');
    var $false = $('<input type="radio" value="false"> <label>False</label>');
    var $newDiv = $('<div></div>');
    $false.attr('name', 'q' + i)
    $true.attr('name', 'q' + i)

    $newDiv.text('Question #' + (i + 1));
    var question = `Question: ${item.question}`;
    var answer = `Answer: ${item.answer}`;
    $qDiv.text(question);
    $aDiv.text(answer);
    $newDiv.append($qDiv);
    $newDiv.append($aDiv);
    $newDiv.append($hideAnswer);
    $newDiv.append($true);
    $newDiv.append($false);
    $parentDiv.append($newDiv);
  });
  $modal.find('.modal-body').empty().append($parentDiv);
}

var submit = function () {
  var inputs;
  $("#quizform").each(function () {
    inputs = $(this).find(':checked'); //<-- Should return all input elements in that specific form.

  });
  var count = 0;
  inputs.each(function (item, el) {
    if ($(el).val() === 'true') count++;
  });
  $results = $('<div></div>');
  $results.text(count + ' correct choices out of ' + inputs.length);
  $('#quizform').empty().append($results);
}
var show = function () {
  var showMe = $('#quizform').find('.answr');
  var hideMe = $('#quizform').find('.show_hide');
  $(showMe).toggle('slow');
  $(hideMe).toggle('slow');

}

$("#takequizmodal").on('show.bs.modal', function (event) {
  showQuiz(event, $(this))
});
$("#showcardmodal").on('show.bs.modal', function (event) {
  showCard(event, $(this))
});
$("#showcardmodal").on('click', 'button#add', function (event) {
  addCard($(this))
});
$('#myTab a').on('click', function (e) {
  e.preventDefault();
  showDatabaseContents();
  showDecks();
  $(this).tab('show');
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

showDecks();

