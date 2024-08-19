function unitToTeaspoons(quantity, unit) {
  if (unit == "cup") {
    // 1 cup is 48 teaspoons
    return quantity * 48;
  } else if (unit == "tbsp") {
    // 1 tablespoon is 3 teaspoons
    return quantity * 3;
  }
  else {
    // catch-all for all other units, incl. teaspoon
    return quantity;
  }
}

function teaspoonsToUnit(quantity, unit) {
  if (unit == "cup") {
    // 1 cup is 48 teaspoons
    return quantity / 48;
  } else if (unit == "tbsp") {
    // 1 tablespoon is 3 teaspoons
    return quantity / 3;
  }
  else {
    // catch-all for all other units, incl. teaspoon
    return quantity;
  }
}

function convertUnitString(quantity, inputUnit, outputUnit) {
  let quantityInTeaspoons = unitToTeaspoons(quantity, inputUnit);
  let quantityInOutputUnit = teaspoonsToUnit(quantityInTeaspoons, outputUnit);
  let rounded = Math.round(quantityInOutputUnit * 100) / 100;

  console.log("Unrounded: " + quantityInOutputUnit);
  console.log("Rounded: " + rounded);

  let inputStr = quantity + " " + inputUnit + "s";
  let outputStr = rounded + " " + outputUnit + "s";

  return inputStr + " is " + outputStr;
}

// TODO: consider having students handle cases where
//       JS is disabled
window.onload = (_) => {
  document.getElementById('volume-form').onsubmit = function (e) {
    e.preventDefault(); // required to stop the page from refreshing

    let quantity = document.getElementById('volume-quantity').value;
    let inputUnit = document.getElementById('volume-input-unit').value;
    let outputUnit = document.getElementById('volume-output-unit').value;

    console.log("User input: " + quantity + " " + inputUnit + "s");
    console.log("User wants: " + outputUnit);

    document.getElementById('volume-answer').innerHTML = convertUnitString(quantity, inputUnit, outputUnit);
  }
}
