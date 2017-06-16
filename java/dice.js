/**
 * Dice object
 *
 * @var numbers Array
 * @var activeNumber Number
 * @var thrown Bool
 */
function Dice(numbers, activeNumber, thrown) {
  // Array of object Number
  this.numbers = numbers;
  // The present active Number.
  this.activeNumber = activeNumber;
  // Has the dice been thrown?
  // Is changed in dice.prototype.throwIt
  this.thrown = thrown;
}

Dice.prototype.throwIt = function () {
  if (activePlayer.attemptsLeft > 0) {
    if (numberOfDiceRolls < 3 && dice.thrown == false) {
      // The dice is rolling
      // Set the button to busy
      $("#diceButton").removeClass('ready').addClass('busy');
      newNumber();
      numberOfDiceRolls++;
      window.setTimeout(changeDice, 250 * numberOfDiceRolls);
    } else {
      // The dice is done rolling.
      numberOfDiceRolls = 0;
      numberOfPieceMoves = 0;
      if (activePlayer.hasActivePieces() === true || dice.activeNumber.number === 6) {
        // A piece needs to be moved.
        if (this.thrown) {
          alert('Flyt en brik!');
        } else {
          if (dice.activeNumber.number !== 6) { // Only reduce if not 6.
            activePlayer.reduceAttempts();
          }
        }
        this.thrown = true;
      } else {
        // Reduce the players attempts.
        activePlayer.reduceAttempts();
        if (activePlayer.attemptsLeft == 0 && activePlayer.hasActivePieces() == false) {
          activePlayer.changePlayer();
        }
        // There is no pieces to move.
        this.thrown = false;
        $("#diceButton").addClass('ready').removeClass('busy');
      }
    }
  } else {
    alert('Ikke flere forsøg tilbage. Flyt en brik');
  }
}

function changeDice() {
  $('#diceSvg circle').each(function () {
    $(this).addClass('hide');
  });

  $('circle[dice="' + dice.activeNumber.textNumber + '"]').each(function () {
    $(this).removeClass('hide');
  });
  $("#diceButton").click();
}

function newNumber() {
  dice.activeNumber = dice.numbers[Math.floor(Math.random() * dice.numbers.length)];
  console.log("dice number: " + dice.activeNumber.number);
}


/**
 * Number object
 *
 * @var textNumber string
 * @var number int
 */
function Number(textNumber, number) {
  this.textNumber = textNumber;
  this.number = number;
}
