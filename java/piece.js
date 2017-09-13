/*
 CREATED BY LKH - 2017
*/

function Piece(position, count, cx, cy) {
  this.position = position;
  this.count = count;
  this.cx = cx;
  this.cy = cy;

  /**
   * Start function for moving the piece. Here we decide what kind of move.
   *
   * @var string id
   */
  this.move = function (id) {
    this.id = id;
    // The piece is at home and dice is six
    if (this.count === 0 && dice.activeNumber.number === 6) {
      this.moveFromHome();
    } else if (this.count + 1 > 51) { // Final stretch.
      this.moveFinal();
    } else if (this.count + 1 < 52 && this.count > 0) { // Ordinary movement.
      this.moveOrdinary();
    } else { // If you try to move a piece "at home base" with a dice below six.
      alert('Denne brik kan vist ikke flyttes?');
    }
  };

  /**
   * Move the piece from home onto the plate.
   */
  this.moveFromHome = function () {
    var field = $("#" + activePlayer.startField)[0];
    activePlayer.attemptsLeft = 0;
    this.count = 1;
    this.moveThePiece(field, "notHome");
    this.finalAction(this.id, "notHome");
  };

  /**
   * Finds the next field for an ordinary turn.
   * @var integer
   */
  this.moveOrdinary = function () {
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
      this.finalAction("notHome");
    }
  };

  /**
   * Finds the next field for the final run.
   */
  this.moveFinal = function () {
    var fieldNumber = 0;
    if (movesLeft < dice.activeNumber.number) {
      movesLeft += 1;
      fieldNumber = (this.count + 1) - 51;
      var newField = (fieldNumber < 6) ?
        $("#" + activePlayer.color + "-final-" + fieldNumber)[0] :
        $('#' + activePlayer.color + '-home')[0];
      this.count += 1;
      this.moveThePiece(newField, "notHome");
      window.setTimeout(clickPiece, 150 * movesLeft, this.id);
    } else {
      movesLeft = 0;
      this.finalAction("notHome");
    }
  };

  /**
   * Sent the piece back home
   * @var color
   * @var place
   */
  this.goHome = function () {
    var homeBase = document.getElementById(
      this.id.split('-')[0] + "-base-" + (this.id.split('-')[1])
    );

    this.count = 0;
    this.moveThePiece(homeBase, "home");
    this.finalAction("home");
  };

  /**
   * This does the actual movement of the piece.
   * @var field
   * @var typeOfMovement
   */
  this.moveThePiece = function (field, typeOfMovement) {
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

    // Check if the activePlayer has a piece on this position.
    var pieces = document.querySelectorAll("circle[type='piece']");
    for (var i = 0; i < pieces.length; i++) {
      if (this.cx === pieces[i].attributes.cx.value &&
        this.cy === pieces[i].attributes.cy.value) {
        if (activePlayer.color === pieces[i].attributes.color.value &&
          this.id !== pieces[i].attributes.id.value) {
          movesLeft = dice.activeNumber.number;
        }
      }
    }
  };

  /**
   * Sets the CX and CY for the piece.
   * @var field
   */
  this.setXandY = function (field) {
    if (field.attributes.id.value.indexOf('base') !== -1) {
      this.position = field.attributes.id.value.substring(
        0, field.attributes.id.value.length - 2
      );
    } else {
      this.position = field.attributes.id.value.replace('id=', '').replace('"', '');
    }
    // SET THE CY
    document.getElementById(this.id).setAttribute('cy', this.cy);
    // SET THE CX
    document.getElementById(this.id).setAttribute('cx', this.cx);
  };

  this.finalAction = function (typeOfMovement) {
    if (typeOfMovement !== "home") {

      // This is not complete - if two pieces at a place are missing.
      var piecesOnSamePlate = [];
      for (var i = 0; i < players.length; i++) {
        if (players[i].color !== activePlayer.color) {
          var playerPieces = players[i].pieces;
          for (var j = 0; j < playerPieces.length; j++) {
            if (this.cx === playerPieces[j].cx && this.cy === playerPieces[j].cy) {
              piecesOnSamePlate.push(players[i].pieces[j]);
            }
          }
        }
      }
      if (piecesOnSamePlate.length == 1) {
        piecesOnSamePlate[0].goHome();
      } else if (piecesOnSamePlate.length > 1) {
        this.goHome();
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
    }
  };

}

function clickPiece(id) {
  $("#" + id).click();
}
