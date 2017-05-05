/*
 CREATED BY LKH - 2017
*/

function Player(color, startField, pieces) {
  this.color = color;
  this.startField = startField;
  this.pieces = pieces;
}

/**
 * Change to the next player
 * Throws the dice automatically.
 */
Player.prototype.change = function() {
  var index = players.indexOf(activePlayer);
  activePlayer = (index == 3) ? players[0] : players[index+1];
  $("#showActivePlayer").html(activePlayer.color);
  dice.throwDice();
}

/**
 * Check if the all pieces are home or finished.
 * @return bool
 */
Player.prototype.hasNoActivePieces = function() {
  var returnValue = true;
  for (var i = 0; i < this.pieces.length; i++) {
    if (this.pieces[i].position !== this.color + "-base"
      && this.pieces[i].position !== this.color + "-home") {
      returnValue = false;
    }
  }
  return returnValue;
}
