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
  } else if (this.position.includes('base') === false &&
    this.position.includes('final') === false) {
    if (this.count+dice.activeNumber.number > 51) {
      this.moveFinal();
    } else {
      this.moveOrdinary();
    }
  } else if (this.position.includes('final') === true) {
    this.moveFinal();
  } else {
    alert('Denne brik kan vist ikke flyttes?');
  }

};

/**
 *
 * Move the piece from home onto the plate.
 *
 */
Piece.prototype.moveFromHome = function () {
  var field = $("#" + activePlayer.startField)[0];
  activePlayer.attemptsLeft = 0;
  this.position = activePlayer.startField;
  this.count = 1;
  this.moveThePiece(field, "notHome");
};

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

  this.count += dice.activeNumber.number;
  this.moveThePiece(newField, "notHome");
};

/**
 * Finds the next field for the final run.
 * @return field
 */
Piece.prototype.moveFinal = function () {
  var fieldNumber = (51 - this.count);
  var field = (fieldNumber < 6) ?
    $("#" + activePlayer.color + "-final-" + fieldNumber)[0] :
    $('#' + activePlayer.color + '-home')[0];
  if (fieldNumber > 6) {
    this.position = 'finished';
  }
  return field;
};

Piece.prototype.goHome = function (color, place) {

  var homeBase = document.getElementById(color + "-base-" + place);

  this.position = color + "-base";
  this.count = 0;
  this.moveThePiece(homeBase, "home");
};

/**
 * Set the X for the piece and html element
 * @var x
 * @var element
 * @return this
 */
Piece.prototype.setCx = function () {
  $("#" + this.id).attr('cx', this.cx);
};

/**
 * Set the Y for the piece and html element
 * @var y
 * @var element
 * @return this
 */
Piece.prototype.setCy = function () {
  $("#" + this.id).attr('cy', this.cy);
};

Piece.prototype.moveThePiece = function (field, typeOfMovement) {
  var cx = 0;
  var cy = 0;

  if (typeOfMovement === "notHome") {
    cx = (parseInt(field.attributes.x.value.replace('em', '')) + 1.5);
    cy = (parseInt(field.attributes.y.value.replace('em', '')) + 1.5);
  } else {
    cx = (parseInt(field.attributes.cx.value.replace('em', '')));
    cy = (parseInt(field.attributes.cy.value.replace('em', '')));
  }

  this.cx = cx + "em";
  this.cy = cy + "em";

  numberOfPieceMoves = numberOfPieceMoves + 1;

  this.setXandY(field);

  // Check if piece hits an opponent or own piece.
  var pieces = document.querySelectorAll("circle[type='piece']");

  for (var i = 0; i < pieces.length; i++) {
    if (this.cx === pieces[i].attributes.cx.value
        && this.cy === pieces[i].attributes.cy.value) {
      if (pieces[i].attributes.color.value !== this.id.split('-')[0]) { // Opponent
        for (var j = 0; j < players.length; j++) {
          if (players[j].color === pieces[i].attributes.color.value) { // Fetching correct player color
            var pieceId = (parseInt(pieces[i].attributes.id.value.split('-')[1]) - 1);
            players[j].pieces[pieceId].goHome(
              pieces[i].attributes.color.value,
              pieces[i].attributes.id.value.split('-')[1]
            );
          }
        }
      } else if (activePlayer.color === pieces[i].attributes.color.value
          && this.id !== pieces[i].attributes.id.value) {
        // Own piece. Cannot jump over.
        console.log('her');
      }
    }
  }

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
};

Piece.prototype.setXandY = function (field) {
  this.position = field.attributes.id.value.replace('id=', '').replace('"', '');
  this.setCy();
  this.setCx();
};
