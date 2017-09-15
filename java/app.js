/*
 CREATED BY LKH - 2017
*/

document.getElementById("diceButton").addEventListener("click", function () {
  dice.throwIt();
});

document.getElementById("showActivePlayer").innerHTML = activePlayer.color;
//$("#showActivePlayer").html(activePlayer.color);
document.getElementById("attemptsLeft").innerHTML = activePlayer.attemptsLeft;
//$("#attemptsLeft").html(activePlayer.attemptsLeft);

/**
 * Manipulate piece.
 */
var pieces = document.querySelectorAll("circle[type='piece']");
for (var i = 0; i < pieces.length; i++) {
  pieces[i].addEventListener("click", function () {
    clickIt(this);
  });
}

function clickIt(ele) {
  if (activePlayer.color === ele.attributes.color.value && dice.thrown) {
    var pieceId = (parseInt(ele.attributes.id.value.split('-')[1]) - 1);
    if (activePlayer.pieces[pieceId].position !== activePlayer.color + "-home") {
      activePiece = activePlayer.pieces[pieceId];
      activePiece.move(activePlayer.color + '-' + (pieceId + 1));
    }
  }
}
