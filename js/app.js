/*
 CREATED BY LKH - 2017
*/

$("#showActivePlayer").html(activePlayer.color);

$("circle[type='piece']").click(function() {
  if (activePlayer.color === $(this).attr('color')) {

    var pieceId = (parseInt($(this).attr('id').split('-')[1])-1);
    if (activePlayer.pieces[pieceId].position !== activePlayer.color+"-home") {
      activePlayer.pieces[pieceId].move($(this));
    }
  }
});
