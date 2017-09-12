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

  // THIS NEEDS TO BE CHANGED.

  // The piece is at home and dice is six
  if (this.count === 0 && dice.activeNumber.number === 6) {
    this.moveFromHome();
  } else if (this.count + 1 > 51) { // dice.activeNumber.number must be removed when window.setTimeout() is used.
    this.moveFinal();
  } else if (this.count + 1 < 52 && this.count > 0) { // dice.activeNumber.number must be removed when window.setTimeout() is used.
    this.moveOrdinary();
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
  this.count = 1;
  this.moveThePiece(field, "notHome");
  finalAction("notHome");
};

/**
 * Finds the next field for an ordinary turn.
 * @var integer
 * @return field
 */
Piece.prototype.moveOrdinary = function () {

  var fieldNumber = 0;

  // moveThePiece must be called with window.setTimeout() function
  if (movesLeft < dice.activeNumber.number) {
    movesLeft += 1;
    fieldNumber = parseInt(this.position.split('-')[1]) + 1;
    var newField = (fieldNumber < 53) ?
      $("#field-" + fieldNumber)[0] :
      $("#field-" + (fieldNumber - 52))[0];
    this.count += 1;
    this.moveThePiece(newField, "notHome");

    window.setTimeout(clickPiece, 150 * movesLeft, this.id);
  } else {
    movesLeft = 0;
    finalAction("notHome");
  }
};

/**
 * Finds the next field for the final run.
 * @return field
 */
Piece.prototype.moveFinal = function () {

  var fieldNumber = 0;
  // moveThePiece must be called with window.setTimeout() function
  if (movesLeft < dice.activeNumber.number) {
    movesLeft += 1;
    fieldNumber = (this.count + 1) - 51;
    var newField = (fieldNumber < 6) ?
      $("#" + activePlayer.color + "-final-" + fieldNumber)[0] :
      $('#' + activePlayer.color + '-home')[0];
    this.count += 1;
    this.moveThePiece(newField, "notHome");
    window.setTimeout(clickPiece, 150 * movesLeft, this.id);
    // Call the moveThePiece
  } else {
    movesLeft = 0;
    finalAction("notHome");
  }
};

Piece.prototype.goHome = function (color, place) {

  var homeBase = document.getElementById(color + "-base-" + place);

  this.count = 0;
  this.moveThePiece(homeBase, "home");
  finalAction("home");
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

  this.setXandY(field);

  // ** // ** // ** // ** // ** // ** // ** // ** // ** // ** // ** // ** //

  // Check if piece hits an opponent or own piece.
  var pieces = document.querySelectorAll("circle[type='piece']");
  for (var i = 0; i < pieces.length; i++) {
    if (this.cx === pieces[i].attributes.cx.value &&
      this.cy === pieces[i].attributes.cy.value) {
      if (pieces[i].attributes.color.value !== this.id.split('-')[0]) { // Opponent. Only run this on last movement.
        for (var j = 0; j < players.length; j++) {
          if (players[j].color === pieces[i].attributes.color.value) { // Fetching correct player color
            var pieceId = (parseInt(pieces[i].attributes.id.value.split('-')[1]) - 1);
            players[j].pieces[pieceId].goHome(
              pieces[i].attributes.color.value,
              pieces[i].attributes.id.value.split('-')[1]
            );
          }
        }
      } else if (activePlayer.color === pieces[i].attributes.color.value &&
        this.id !== pieces[i].attributes.id.value) {
        // Own piece. Cannot jump over. Each movement.
        console.log('her');
      }
    }
  }
  //finalAction(typeOfMovement);
};

Piece.prototype.setXandY = function (field) {
  if (field.attributes.id.value.indexOf('base') !== -1) {
    this.position = field.attributes.id.value.substring(
      0, field.attributes.id.value.length - 2
    );
  } else {
    this.position = field.attributes.id.value.replace('id=', '').replace('"', '');
  }
  // SET THE CY
  $("#" + this.id).attr('cy', this.cy);
  // SET THE CX
  $("#" + this.id).attr('cx', this.cx);
};

function clickPiece(id) {
  $("#" + id).click();
}

function finalAction(typeOfMovement) {
  // Last changes when final movement done.
  if (typeOfMovement !== "home") {
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
}
