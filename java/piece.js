/*
 CREATED BY LKH - 2017
*/

function Piece(position, count, cx, cy) {
  this.position = position;
  this.count = count;
  this.cx = cx;
  this.cy = cy;
}

/**
 * Start function for moving the piece. Here we decide what kind of move.
 *
 * @var string id
 */
Piece.prototype.move = function (id) {
  this.id = id;
  // The piece is at home and dice is six
  if (this.count === 0 && dice.activeNumber.number === 6) {
    this.moveFromHome();
  } else if (this.position.includes('base') == false &&
    this.position.includes('final') == false) {
    this.moveOrdinary();
  } else if (this.position.includes('final') == true) {
    this.moveFinal();
  } else {
    alert('Denne brik kan vist ikke flyttes?');
  }

}

/**
 *
 * Move the piece from home onto the plate.
 *
 */
Piece.prototype.moveFromHome = function () {
  var field = $("#" + activePlayer.startField)[0];
  activePlayer.attemptsLeft = 0;
  //this.position = activePlayer.startField;
  this.count = 1;
  this.moveThePiece(field);
}

/**
 * Finds the next field for an ordinary turn.
 * @var integer
 * @return field
 */
Piece.prototype.moveOrdinary = function () {
  var fieldNumber = parseInt(this.position.split('-')[1]) + dice.activeNumber.number;
  var newField = (fieldNumber < 53) ?
    $("#field-" + fieldNumber)[0] :
    $("#field-" + (fieldNumber - 52))[0];

  this.moveThePiece(newField);
}

/**
 * Finds the next field for the final run.
 * @return field
 */
Piece.prototype.moveFinal = function () {
  var fieldNumber = (this.count - 51);
  var field = (fieldNumber < 6) ?
    $("#" + activePlayer.color + "-final-" + fieldNumber)[0] :
    $('#' + activePlayer.color + '-home')[0];
  if (fieldNumber > 6) {
    this.position = 'finished';
  }
  return field;
}

Piece.prototype.goHome = function (ele) {

  var number = $(ele).attr('id').replace($(ele).attr('color') + "-", '');
  var homeBase = $("#" + $(ele).attr('color') + "-base-" + number);

  this.position = $(ele).attr('color') + "-base";
  this.count = 0;
  this.moveThePiece(homeBase, ele);
}

/**
 * Set the X for the piece and html element
 * @var x
 * @var element
 * @return this
 */
Piece.prototype.setCx = function () {
  $("#" + this.id).attr('cx', this.cx);
  return this;
}

/**
 * Set the Y for the piece and html element
 * @var y
 * @var element
 * @return this
 */
Piece.prototype.setCy = function () {
  $("#" + this.id).attr('cy', this.cy);
  return this;
}

Piece.prototype.moveThePiece = function (field) {
  var cx = (parseInt(field.attributes.x.value.replace('em', '')) + 1.5);
  this.cx = cx + "em";
  var cy = (parseInt(field.attributes.y.value.replace('em', '')) + 1.5);
  this.cy = cy + "em";
  numberOfPieceMoves = numberOfPieceMoves + 1;

  this.setXandY(field);

  // Check if piece hits an opponent.
  $("circle[type='piece']").each(function (index) {
    if (this.cx === $(this).attr('cx') &&
      this.cy === $(this).attr('cy') &&
      $(this).attr('color') !== activePlayer.color) {
      for (var i = 0; i < players.length; i++) {
        if (players[i].color === $(this).attr('id').split('-')[0]) {
          var pieceId = (parseInt($(this).attr('id').split('-')[1]) - 1);
          players[i].pieces[pieceId].goHome($(this).attr('id'));
        }
      }
    }
  });
  if (dice.activeNumber.number !== 6) {
    //The user has moved and will lose its turn
    activePlayer.changePlayer();
  } else {
    // The user has thrown a 6 and gets another try.
    activePlayer.attemptsLeft = 1;
    $("#attemptsLeft").html(activePlayer.attemptsLeft);
  }
  $("#diceButton").removeClass('busy').addClass('ready');
  dice.thrown = false;
}

Piece.prototype.setXandY = function (field) {
  this.position = field.attributes.id.value.replace('id=', '').replace('"', '');
  this.setCy();
  this.setCx();
}
