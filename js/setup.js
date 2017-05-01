var yellowPieceOne = new Piece('yellow-base', 0, '6em', '6em');
var yellowPieceTwo = new Piece('yellow-base', 0, '14em', '6em');
var yellowPieceThree = new Piece('yellow-base', 0, '6em', '14em');
var yellowPieceFour = new Piece('yellow-base', 0, '14em', '14em');

var yellow = new Player(
  'yellow',
  'field-2',
  [yellowPieceOne, yellowPieceTwo, yellowPieceThree, yellowPieceFour]
);

var greenPieceOne = new Piece('green-base', 0, '34em', '6em');
var greenPieceTwo = new Piece('green-base', 0, '42em', '6em');
var greenPieceThree = new Piece('green-base', 0, '34em', '14em');
var greenPieceFour = new Piece('green-base', 0, '42em', '14em');

var green = new Player(
  'green',
  'field-15',
  [greenPieceOne, greenPieceTwo, greenPieceThree, greenPieceFour]
);

var redPieceOne = new Piece('red-base', 0, '34em', '34em');
var redPieceTwo = new Piece('red-base', 0, '42em', '34em');
var redPieceThree = new Piece('red-base', 0, '34em', '42em');
var redPieceFour = new Piece('red-base', 0, '42em', '42em');

var red = new Player(
  'red',
  'field-28',
  [redPieceOne, redPieceTwo, redPieceThree, redPieceFour]
);

var bluePieceOne = new Piece('blue-base', 0, '6em', '34em');
var bluePieceTwo = new Piece('blue-base', 0, '14em', '34em');
var bluePieceThree = new Piece('blue-base', 0, '6em', '42em');
var bluePieceFour = new Piece('blue-base', 0, '14em', '42em');

var blue = new Player(
  'blue',
  'field-41',
  [bluePieceOne, bluePieceTwo, bluePieceThree, bluePieceFour]
);

var players = [yellow, green, red, blue];

var one = new Dice('one', 1);
var two = new Dice('two', 2);
var three = new Dice('three', 3);
var four = new Dice('four', 4);
var five = new Dice('five', 5);
var six = new Dice('six', 6);

var diceNumbers = [one, two, three, four, five, six];

// Setting start values
var activePlayer = players[0];
var dice = diceNumbers[5];

var countClick = 0;
