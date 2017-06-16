/*
 CREATED BY LKH - 2017
*/

$("#diceButton").click(function () {
  dice.throwIt();
});

$("#showActivePlayer").html(activePlayer.color);
$("#attemptsLeft").html(activePlayer.attemptsLeft);

/**
 * Manipulate piece.
 */
$("circle[type='piece']").click(function () {
  if (activePlayer.color === $(this).attr('color') && dice.thrown) {

    var pieceId = (parseInt($(this).attr('id').split('-')[1]) - 1);
    if (activePlayer.pieces[pieceId].position !== activePlayer.color + "-home") {
      activePiece = activePlayer.pieces[pieceId];
      activePiece.move(activePlayer.color + '-' + (pieceId + 1));
    }
  }
});
