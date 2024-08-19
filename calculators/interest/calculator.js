function arbitraryLog(base, argument) {
  // See: https://en.wikipedia.org/wiki/List_of_logarithmic_identities#Changing_the_base
  return Math.log(argument) / Math.log(base);
}

function calcNumYears(principal, final, rate) {
  return arbitraryLog(1 + rate, final/principal);
}

function generateSavingsRow(principal, final, rate) {
  let row = "<tr>";
  row += "<td>" + (to4DecPlaces(rate) * 100) + "%</td>";
  row += "<td>" + Math.ceil(calcNumYears(principal, final, rate)) + "</td>";
  row += "</tr>";
  return row;
}

function to4DecPlaces(num) {
  return Math.round(num * 10000) / 10000;
}

function generateInterestReport() {
  let principal = document.getElementById('principal').value;
  let final = document.getElementById('final').value;

  let report = "";

  report = "<h2>Savings Report</h2>"
  report += "<table>"
  report += "<caption>Number of years required to go from $" + principal + " to $" + final + " at various interest rates.</caption>";
  report += "<thead><tr><th>Interest Rate</th><th>Num Years</th></tr></thead>";
  report += "<tbody>";

  for (let rate = 0.01; rate < 0.05; rate += 0.01) {
    report += generateSavingsRow(principal, final, rate);
  }

  for (let rate = 0.05; rate <= 0.25; rate += 0.05) {
    report += generateSavingsRow(principal, final, rate);
  }

  report += "</tbody></table>";

  return report;
}


window.onload = (_) => {
  document.getElementById('calculator').onsubmit = function (e) {
    e.preventDefault(); // required to stop the page from refreshing

    document.getElementById('report').innerHTML = generateInterestReport();
  }
}
