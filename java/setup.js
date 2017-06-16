/*
 *
 * SETTING UP THE GAME
 *
 */

var yellowPieceOne = new Piece('yellow-base', 0, '6em', '6em');
var yellowPieceTwo = new Piece('yellow-base', 0, '14em', '6em');
var yellowPieceThree = new Piece('yellow-base', 0, '6em', '14em');
var yellowPieceFour = new Piece('yellow-base', 0, '14em', '14em');

var yellow = new Player(
  'yellow',
  'field-2', [yellowPieceOne, yellowPieceTwo, yellowPieceThree, yellowPieceFour],
  3
);

var greenPieceOne = new Piece('green-base', 0, '34em', '6em');
var greenPieceTwo = new Piece('green-base', 0, '42em', '6em');
var greenPieceThree = new Piece('green-base', 0, '34em', '14em');
var greenPieceFour = new Piece('green-base', 0, '42em', '14em');

var green = new Player(
  'green',
  'field-15', [greenPieceOne, greenPieceTwo, greenPieceThree, greenPieceFour],
  3
);

var redPieceOne = new Piece('red-base', 0, '34em', '34em');
var redPieceTwo = new Piece('red-base', 0, '42em', '34em');
var redPieceThree = new Piece('red-base', 0, '34em', '42em');
var redPieceFour = new Piece('red-base', 0, '42em', '42em');

var red = new Player(
  'red',
  'field-28', [redPieceOne, redPieceTwo, redPieceThree, redPieceFour],
  3
);

var bluePieceOne = new Piece('blue-base', 0, '6em', '34em');
var bluePieceTwo = new Piece('blue-base', 0, '14em', '34em');
var bluePieceThree = new Piece('blue-base', 0, '6em', '42em');
var bluePieceFour = new Piece('blue-base', 0, '14em', '42em');

var blue = new Player(
  'blue',
  'field-41', [bluePieceOne, bluePieceTwo, bluePieceThree, bluePieceFour],
  3
);

var players = [yellow, green, red, blue];
var activePlayer = players[0];

var one = new Number('one', 1);
var two = new Number('two', 2);
var three = new Number('three', 3);
var four = new Number('four', 4);
var five = new Number('five', 5);
var six = new Number('six', 6);

var diceNumbers = [one, two, three, four, five, six];

// Setting start values

var dice = new Dice([one, two, three, four, five, six], 0, false);

/*
 * Global vars used in different files.
 */

// Count how many times the dice has rolled.
var numberOfDiceRolls = 0;
var numberOfPieceMoves = 0;
