function to2DecPlaces(num) {
  return Math.round(num * 100) / 100;
}

function rollDice(sides) {
  return Math.round(Math.random() * sides) + 1;
}

function generateSimulationReport(sims, score, turns, header) {
  let summary = "<section>";
  summary += "<h2>" + header + "</h2>";
  summary += "<ul>";
  summary += "<li>simulations run: " + sims + "</li>";
  summary += "<li>avg score (rounded): " + to2DecPlaces(score/sims) + "</li>";
  summary += "<li>avg turns (rounded): " + to2DecPlaces(turns/sims) + "</li>";
  summary += "</ul>";
  summary += "</section>";

  return summary;
}

function runSimulations(sims, logEveryRun, idx) {
  let report = document.getElementById('report');

  if (logEveryRun) {
    report.innerHTML += "<h2>Runs</h2><ul>";
  }

  let aggregateScore = 0;
  let aggregateTurns = 0;

  for (let i = 0; i < sims; i++) {
    // Simulating one game

    let numDice = 5;
    let gameScore = 0;
    let gameTurns = 0;

    while (numDice > 0) {
      // Simulating one turn
      gameTurns++;

      let num2Or5 = 0;
      let turnScore = 0;

      for (let dice = 0; dice < numDice; dice++) {
        let roll = rollDice(6);

        if (roll == 2 || roll == 5) {
          num2Or5++;
        }

        turnScore += roll;
      }

      // If seen any 2s or 5s, don't add score and remove some dice.
      if (num2Or5 > 0) {
        numDice -= num2Or5;
      } else {
        gameScore += turnScore;
      }
    }

    // Game done! Keep count, and log.
    aggregateScore += gameScore;
    aggregateTurns += gameTurns;

    if (logEveryRun) {
      report.innerHTML += "<li>Run #" + (i + 1) + " | Score: " + gameScore + " (" + gameTurns + " turns)</li>";
    }
  }

  if (logEveryRun) {
    report.innerHTML += "</ul>";
  }

  report.innerHTML += generateSimulationReport(
    sims,
    aggregateScore,
    aggregateTurns,
    "Simulation #" + idx + " Summary",
  );
}

window.onload = (_) => {
  let numSimulations = 0;
  document.getElementById('calculator').onsubmit = function (e) {
    e.preventDefault(); // required to stop the page from refreshing

    numSimulations++;
    runSimulations(
      document.getElementById('simulations').value,
      document.getElementById('log-every-run').checked,
      numSimulations
    );
  }
}
