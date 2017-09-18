/*
 CREATED BY LKH - 2017
*/

/**
 * The Player
 *
 * @var color
 * @var startField
 * @var pieces
 * @var hasThrownDice
 * @var attemptsLeft
 */
function Player(color, startField, pieces, attemptsLeft) {
  this.color = color;
  this.startField = startField; // Board
  this.pieces = pieces; // array of Pieces
  this.attemptsLeft = attemptsLeft; // Dice

  /**
   * When the player has thrown the dice.
   */
  this.reduceAttempts = function () {
    this.attemptsLeft = (this.attemptsLeft - 1);
    document.getElementById("attemptsLeft").innerHTML = this.attemptsLeft;
  };

  /**
   * Tell if the activeplayer can move a piece.
   * @return bool
   */
  this.canMovePiece = function () {
    var returnValue = false;
    if (dice.thrown === true && this.hasActivePieces()) {
      returnValue = true;
    }

    if (dice.activeNumber.number === 6 && !this.hasActivePieces()) {
      returnValue = true;
    }
    return returnValue;
  };

  /**
   *  Does the player have active pieces.
   * @return bool
   */
  this.hasActivePieces = function () {
    var returnValue = false;
    for (var i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].position !== this.color + "-base" &&
        this.pieces[i].position !== this.color + "-home") {
        returnValue = true;
      }
    }
    return returnValue;
  };

  /**
   * Change to the next player
   * Resets the hasThrownDice
   * Sets the attemptsLeft correctly
   *
   * @return bool
   */
  this.changePlayer = function () {
    var index = players.indexOf(activePlayer);
    activePlayer = (index == 3) ? players[0] : players[index + 1];

    activePlayer.attemptsLeft = (activePlayer.hasActivePieces()) ? 1 : 3;
    dice.thrown = false;
    document.getElementById("showActivePlayer").innerHTML = activePlayer.color;
    document.getElementById("attemptsLeft").innerHTML = activePlayer.attemptsLeft;
  };
}
