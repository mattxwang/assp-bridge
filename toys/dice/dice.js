function to2DecPlaces(num) {
  return Math.round(num * 100) / 100;
}

function rollDice(sides) {
  return Math.round(Math.random() * sides) + 1;
}

function playGame(sides) {
  let rolls = document.getElementById('rolls');

  let seenSeven = false;
  let numRolls = Number(document.getElementById('num-rolls').innerHTML);
  let score = Number(document.getElementById('score').innerHTML);

  while (!seenSeven) {

    let r1 = rollDice(sides);
    let r2 = rollDice(sides);
    numRolls += 2;
    score += r1 + r2;

    rolls.innerHTML += "<li>" + r1 + " + " + r2 + " = " + (r1 + r2) + "</li>";

    if (r1 + r2 == 7) {
      seenSeven = true;
    }
  }

  document.getElementById('num-rolls').innerHTML = numRolls;
  document.getElementById('score').innerHTML = score;
  document.getElementById('ratio').innerHTML = to2DecPlaces(score/numRolls);
}


window.onload = (_) => {
  document.getElementById('play').onclick = function() {
    playGame(6);
  }

  document.getElementById('reset').onclick = function() {
    document.getElementById('num-rolls').innerHTML = 0;
    document.getElementById('score').innerHTML = 0;
  }
}
