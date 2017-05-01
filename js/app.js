$(document).foundation()

/*
 CREATED BY LKH - 2017

*/

var yellowPieceOne = new Piece('yellow-base', 0, '6em', '6em');
var yellowPieceTwo = new Piece('yellow-base', 0, '14em', '6em');
var yellowPieceThree = new Piece('yellow-base', 0, '6em', '14em');
var yellowPieceFour = new Piece('yellow-base', 0, '14em', '14em');

var yellow = new Player(
  'yellow',
  'field-2',
  [yellowPieceOne, yellowPieceTwo, yellowPieceThree, yellowPieceFour]
);

var greenPieceOne = new Piece('green-base', 0, '34em', '6em');
var greenPieceTwo = new Piece('green-base', 0, '42em', '6em');
var greenPieceThree = new Piece('green-base', 0, '34em', '14em');
var greenPieceFour = new Piece('green-base', 0, '42em', '14em');

var green = new Player(
  'green',
  'field-15',
  [greenPieceOne, greenPieceTwo, greenPieceThree, greenPieceFour]
);

var redPieceOne = new Piece('red-base', 0, '34em', '34em');
var redPieceTwo = new Piece('red-base', 0, '42em', '34em');
var redPieceThree = new Piece('red-base', 0, '34em', '42em');
var redPieceFour = new Piece('red-base', 0, '42em', '42em');

var red = new Player(
  'red',
  'field-28',
  [redPieceOne, redPieceTwo, redPieceThree, redPieceFour]
);

var bluePieceOne = new Piece('blue-base', 0, '6em', '34em');
var bluePieceTwo = new Piece('blue-base', 0, '14em', '34em');
var bluePieceThree = new Piece('blue-base', 0, '6em', '42em');
var bluePieceFour = new Piece('blue-base', 0, '14em', '42em');

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
Player.prototype.change = function() {
  var index = players.indexOf(activePlayer);
  activePlayer = (index == 3) ? players[0] : players[index+1];
  $("#showActivePlayer").html(activePlayer.color);
  dice.throwDice();
}

// Setting start values
var activePlayer = players[0];
var dice = diceNumbers[5];

function Piece(position, count, cx, cy) {
  this.position = position;
  this.count = count;
  this.cx = cx;
  this.cy = cy;
}
Piece.prototype.move = function(ele) {

  if (this.position === activePlayer.color + "-base") { // Home base
    var field = this.moveFromHome();
  } else {
    var fieldsToMove = parseInt(dice.number);
    this.count += fieldsToMove;
    if(this.count < 52) { // Ordinary run.

      var fieldNumber = parseInt(this.position.split('-')[1])+fieldsToMove;
      var field = (fieldNumber < 53) ? $("#field-" + fieldNumber)[0] : $("#field-" + (fieldNumber-52))[0];

    } else { // Final run

      var fieldNumber = (this.count-51);
      var field = (fieldNumber < 6) ? $("#" + activePlayer.color + "-final-" + fieldNumber)[0] :
      $('#' + activePlayer.color + '-home')[0];
    }
    this.position = field.attributes.id.value;
  }
  if (field !== false) {
    var cx = parseInt(field.attributes.x.value.replace('em', ''));
    newCx = this.cx = (cx+1.5)+"em";
    var cy = parseInt(field.attributes.y.value.replace('em', ''));
    newCy = this.cy = (cy+1.5)+"em";

    $(ele).attr('cx', newCx);
    $(ele).attr('cy', newCy);

    $("circle[type='piece']").each(function(index) {
      if(newCx === $(this).attr('cx')
        && newCy === $(this).attr('cy')
        && $(this).attr('color') !== activePlayer.color) {
        for(var i = 0; i < players.length;i++) {
          if (players[i].color === $(this).attr('id').split('-')[0]) {
            var pieceId = (parseInt($(this).attr('id').split('-')[1])-1);
            players[i].pieces[pieceId].goHome($(this));
          }
        }
      }
    });
    countClick = 0;
    activePlayer.change();
  } else { // User is home
    var allHome = true;
    $("circle[type='piece']").each(function(index) {
      for (var j = 0; j < activePlayer.pieces.length; j++) {
        if (activePlayer.pieces[j].position != activePlayer.color + "-base") {
          allHome = false;
        }
      }
    });

    if (allHome) { // All pieces are home - you get three attempts.
      dice.throwDice();
      countClick++;
      if(countClick === 3) {
        activePlayer.change();
      }
    }
  }
}
Piece.prototype.goHome = function(ele) {

  var number = $(ele).attr('id').replace($(ele).attr('color') + "-", '');
  var homeCy = $("#" + $(ele).attr('color') + "-base-" + number).attr('cy');
  var homeCx = $("#" + $(ele).attr('color') + "-base-" + number).attr('cx');
  $(ele).attr('cy', homeCy);
  $(ele).attr('cx', homeCx);

  this.position = $(ele).attr('color') + "-base";
  this.cy = homeCy;
  this.cx = homeCx;
}
Piece.prototype.moveFromHome = function() {

  if (dice.number === 6) {
    var field = $("#" + activePlayer.startField)[0];
    this.position = activePlayer.startField;
    this.count = 1;
    return field;
  } else {
    return false;
  }
}





function Dice(textNumber, number) {
  this.textNumber = textNumber;
  this.number = number;
}
Dice.prototype.throwDice = function() {
  dice = diceNumbers[Math.floor(Math.random()*diceNumbers.length)];

  $('#diceSvg circle').each(function() {
    $(this).addClass('hide');
  });

  $('circle[dice="' + dice.textNumber + '"]').each(function() {
    $(this).removeClass('hide');
  });
}




$("#showActivePlayer").html(activePlayer.color);

var countClick = 0;

$("circle[type='piece']").click(function() {
  var pieceId = (parseInt($(this).attr('id').split('-')[1])-1);
  if (activePlayer.color === $(this).attr('color')) {
    activePlayer.pieces[pieceId].move($(this));
  }
});
