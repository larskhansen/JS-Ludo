$(document).foundation()

var yellowPieceOne = new Piece('yellow-base-1', 0, '6em', '6em');
var yellowPieceTwo = new Piece('yellow-base-2', 0, '14em', '6em');
var yellowPieceThree = new Piece('yellow-base-3', 0, '6em', '14em');
var yellowPieceFour = new Piece('yellow-base-4', 0, '14em', '14em');

var yellow = new Player(
  'yellow',
  'field-2',
  [yellowPieceOne, yellowPieceTwo, yellowPieceThree, yellowPieceFour]
);

var greenPieceOne = new Piece('green-base-1', 0, '34em', '6em');
var greenPieceTwo = new Piece('green-base-2', 0, '42em', '6em');
var greenPieceThree = new Piece('green-base-3', 0, '34em', '14em');
var greenPieceFour = new Piece('green-base-4', 0, '42em', '14em');

var green = new Player(
  'green',
  'field-15',
  [greenPieceOne, greenPieceTwo, greenPieceThree, greenPieceFour]
);

var redPieceOne = new Piece('red-base-1', 0, '34em', '34em');
var redPieceTwo = new Piece('red-base-2', 0, '42em', '34em');
var redPieceThree = new Piece('red-base-3', 0, '34em', '42em');
var redPieceFour = new Piece('red-base-4', 0, '42em', '42em');

var red = new Player(
  'red',
  'field-28',
  [redPieceOne, redPieceTwo, redPieceThree, redPieceFour]
);

var bluePieceOne = new Piece('blue-base-1', 0, '6em', '34em');
var bluePieceTwo = new Piece('blue-base-2', 0, '14em', '34em');
var bluePieceThree = new Piece('blue-base-3', 0, '6em', '42em');
var bluePieceFour = new Piece('blue-base-4', 0, '14em', '42em');

var blue = new Player(
  'blue',
  'field-41',
  [bluePieceOne, bluePieceTwo, bluePieceThree, bluePieceFour]
);

var players = [yellow, green, red, blue];

var one = new Dice('one', 1);
var two = new Dice('two', 2);
var three = new Dice('three', 3);
var four = new Dice('four', 4);
var five = new Dice('five', 5);
var six = new Dice('six', 6);

var diceNumbers = [one, two, three, four, five, six];

function Player(color, startField, pieces) {
  this.color = color;
  this.startField = startField;
  this.pieces = pieces;
}
// Set first player when starting
var activePlayer = players[0];
var diceNumber = diceNumbers[5];

function Piece(position, count, cx, cy) {
  this.position = position;
  this.count = count;
  this.cx = cx;
  this.cy = cy;
}
Piece.prototype.move = function(ele) {
  if (this.position === activePlayer.color + "-base-1") { // Home base
    var field = $("#" + activePlayer.startField)[0];
    var cx = parseInt(field.attributes.x.value.replace('em', ''));
    var cy = parseInt(field.attributes.y.value.replace('em', ''));
    this.position = activePlayer.startField;
    this.count = 1;
    $(ele).attr('cy', (cy+1.5)+"em");
    $(ele).attr('cx', (cx+1.5)+"em");
  } else {
    var pos = parseInt(this.position.split('-')[1]);
    var fieldsToMove = parseInt(diceNumber.number);
    this.count += fieldsToMove;
    if(this.count < 53) { // Ordinary run
      var field = $("#field-" + (pos+fieldsToMove))[0];
    } else { // Final run
      console.log('final');
    }
    var cx = parseInt(field.attributes.x.value.replace('em', ''));
    newCx = this.cx = (cx+1.5)+"em";
    var cy = parseInt(field.attributes.y.value.replace('em', ''));
    newCy = this.cy = (cy+1.5)+"em";
    $(ele).attr('cx', newCx);
    $(ele).attr('cy', newCy);
    this.position = field.attributes.id.value;
  }
  console.log(this);
}

function Dice(textNumber, number) { // PERHAPS ALSO DOTS cx cy?
  this.textNumber = textNumber;
  this.number = number;
}





$("#showActivePlayer").html(activePlayer.color);

$("#dice").click(function() {
  throwDice();
  throwDice();
});

$("circle[type='piece']").click(function() {
  var pieceId = (parseInt($(this).attr('id').split('-')[1])-1);
  if (activePlayer.color = $(this).attr('color')) {
    activePlayer.pieces[pieceId].move($(this));
  }
});

function throwDice() {
  diceNumber = diceNumbers[Math.floor(Math.random()*diceNumbers.length)];

  $('#diceSvg circle').each(function() {
    $(this).addClass('hide');
  });

  $('circle[dice="' + diceNumber.textNumber + '"]').each(function() {
    $(this).removeClass('hide');
  });
}
/*
function move(ele) {

  var currentPos = $(ele).attr('position');

  // From start to field 2
  if (currentPos === activePlayer.color + "-base-1") {
    movePlayer($(ele), $(activePlayer.startField));
  } else {
    var pos = parseInt(currentPos.replace('field-', '')) + parseInt(diceNumber[1]);
    var field = $("#field-" + pos);
    var nextField = parseInt($(ele).attr('count'));
    // The if isn't working for any other than yellow
    if(count > 50) {
      field = $("#" + player[0] + "-final-" + (pos - player[2]));
    }
    movePlayer($(ele), field);
  }
  changePlayer();
}
*/

function movePlayer(ele, nextField) {
  console.log(nextField);
  var newX = parseInt(nextField.attr('x').replace('em', ''));
  var newY = parseInt(nextField.attr('y').replace('em', ''));
  $(ele).attr('position', nextField.attr('id'));
  $(ele).attr('cx', (newX+1.5)+"em");
  $(ele).attr('cy', (newY+1.5)+"em");
}

function changePlayer() {
  var index = players.indexOf(player);
  player = (index == 3) ? players[0] : players[index+1];
  $("#showActivePlayer").html(player[0]);
}
