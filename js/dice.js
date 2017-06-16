/*
 CREATED BY LKH - 2017
*/

function Dice(numbers, activeNumber) {
  //  this.textNumber = textNumber;
  //  this.number = number;
  this.numbers = numbers;
  this.activeNumber = activeNumber;
}

function Number(textNumber, number) {
  this.textNumber = textNumber;
  this.number = number;
}

/**
 * Throwing the dice.
 * It will be thrown three times.
 */
Dice.prototype.throwDice = function () {
  // Set color of the dice button to red.
  $("#diceButton").removeClass('ready').addClass('active');
  // If the player has attemts left he can throw the dice.
  if (activePlayer.attemptsLeft > 0) {
    // Show a dice roll.
    if (numberOfDiceRolls < 3) {
      dice = newNumber();
      numberOfDiceRolls++;
      window.setTimeout(changeDice, 250 * numberOfDiceRolls);
    } else {
      // The dice has rolled three times. Set the color of the dice button to green.
      $("#diceButton").removeClass('active').addClass('ready');
      numberOfDiceRolls = 0;
      activePlayer.attemptsLeft = --activePlayer.attemptsLeft;
    }
    activePiece.movesLeft = dice.number;
  }
  if (activePlayer.attemptsLeft === 0) {
    if (activePlayer.hasActivePieces() === false && dice.number !== 6) {
      activePlayer.changePlayer();
    }
  }
  $("#attemptsLeft").html(activePlayer.attemptsLeft);
  activePlayer.thrownDice = true;
}

/**
 * Set the html correct and click the throw dice button
 */
function changeDice() {
  $('#diceSvg circle').each(function () {
    $(this).addClass('hide');
  });

  $('circle[dice="' + dice.textNumber + '"]').each(function () {
    $(this).removeClass('hide');
  });
  $("#diceButton").click();
}

function newNumber() {
  var existingDice = dice;
  var newDice = dice.numbers[Math.floor(Math.random() * dice.numbers.length)];
  if (existingDice === newDice) {
    return newNumber();
  } else {
    return newDice;
  }
}
