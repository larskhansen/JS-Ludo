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
 * The initial move function
 * @var element
 */
Piece.prototype.move = function(ele) {

  if (this.position === activePlayer.color + "-base") { // Home base
    var field = this.moveFromHome();
  } else {
    var fieldsToMove = parseInt(dice.number);
    this.count += fieldsToMove;

    if(this.count < 52) { // Ordinary run.
      var field = this.moveOrdinary(fieldsToMove);
    } else { // Final run
      var field = this.moveFinal();
    }
    this.position = field.attributes.id.value;
  }
  // field can be false if trying to move from home without a 6 (six)
  if (field !== false) {

    var cx = (parseInt(field.attributes.x.value.replace('em', ''))+1.5);
    newCx = this.cx = cx+"em";
    var cy = (parseInt(field.attributes.y.value.replace('em', ''))+1.5);
    newCy = this.cy = cy+"em";
    this.setCy(newCy, ele);
    this.setCx(newCx, ele);

    // Check if piece hits an opponent.
    $("circle[type='piece']").each(function(index) {
      if(newCx === $(this).attr('cx')
        && newCy === $(this).attr('cy')
        && $(this).attr('color') !== activePlayer.color) {
        for(var i = 0; i < players.length; i++) {
          if (players[i].color === $(this).attr('id').split('-')[0]) {
            var pieceId = (parseInt($(this).attr('id').split('-')[1])-1);
            players[i].pieces[pieceId].goHome($(this));
          }
        }
      }
    });
    countClick = 0;
    activePlayer.change();
  } else { // User is home
    if (activePlayer.hasNoActivePieces()) { // All pieces are home - you get three attempts.
      dice.throwDice();
      countClick++;
      if(countClick === 3) {
        activePlayer.change();
      }
    }
  }
}

/**
 * A piece has been sent home.
 * This sets both the piece position, count and the X & Y.
 *
 * @var element.
 */
Piece.prototype.goHome = function(ele) {

  var number = $(ele).attr('id').replace($(ele).attr('color') + "-", '');
  var homeBase = $("#" + $(ele).attr('color') + "-base-" + number);
  var cy = $(homeBase).attr('cy');
  var cx = $(homeBase).attr('cx');

  this.position = $(ele).attr('color') + "-base";
  this.count = 0;
  this.setCy(cy, $(ele));
  this.setCx(cx, $(ele));
}

/**
 * Finds the startField - if the dice is 6.
 * @return field|false
 */
Piece.prototype.moveFromHome = function() {

  if (dice.number === 6) {
    var field = $("#" + activePlayer.startField)[0];
    this.position = activePlayer.startField;
    this.count = 1;
    return field;
  } else {
    return false;
  }
}

/**
 * Finds the next field for an ordinary turn.
 * @var integer
 * @return field
 */
Piece.prototype.moveOrdinary = function(fieldsToMove) {
  var fieldNumber = parseInt(this.position.split('-')[1])+fieldsToMove;
  return (fieldNumber < 53) ? $("#field-" + fieldNumber)[0] : $("#field-" + (fieldNumber-52))[0];
}

/**
 * Finds the next field for the final run.
 * @return field
 */
Piece.prototype.moveFinal = function() {
  var fieldNumber = (this.count-51);
  var field = (fieldNumber < 6) ?
    $("#" + activePlayer.color + "-final-" + fieldNumber)[0] :
    $('#' + activePlayer.color + '-home')[0];
  if (fieldNumber > 6) {
    this.position = 'finished';
  }
  return field;
}

/**
 * Set the X for the piece and html element
 * @var x
 * @var element
 * @return this
 */
Piece.prototype.setCx = function(cx, ele) {
  this.cx = cx;
  $(ele).attr('cx', cx);
  return this;
}

/**
 * Set the Y for the piece and html element
 * @var y
 * @var element
 * @return this
 */
Piece.prototype.setCy = function(cy, ele) {
  this.cy = cy;
  $(ele).attr('cy', cy);
  return this;
}
