
/*
 CREATED BY LKH - 2017
*/

$("#showActivePlayer").html(activePlayer.color);

$("circle[type='piece']").click(function() {
  var pieceId = (parseInt($(this).attr('id').split('-')[1])-1);
  if (activePlayer.color === $(this).attr('color')) {
    activePlayer.pieces[pieceId].move($(this));
  }
});
