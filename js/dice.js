function Dice(textNumber, number) {
  this.textNumber = textNumber;
  this.number = number;
}
Dice.prototype.throwDice = function() {
  dice = diceNumbers[Math.floor(Math.random()*diceNumbers.length)];

  $('#diceSvg circle').each(function() {
    $(this).addClass('hide');
  });

  $('circle[dice="' + dice.textNumber + '"]').each(function() {
    $(this).removeClass('hide');
  });
}
