function unitToTeaspoons(quantity, unit) {
  if (unit == "cup") {
    // 1 cup is 48 teaspoons
    return quantity * 48;
  } else if (unit == "tbsp") {
    // 1 tablespoon is 3 teaspoons
    return quantity * 3;
  } else if (unit == "pint") {
    // 1 pint is 2 cups, or 96 teaspoons
    return quantity * (2 * 48);
  } else if (unit == "quart") {
    // 1 quart is 4 cups, or 192 teaspoons
    return quantity * (4 * 48);
  } else {
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
  } else if (unit == "pint") {
    // 1 pint is 2 cups, or 96 teaspoons
    return quantity / (2 * 48);
  } else if (unit == "quart") {
    // 1 quart is 4 cups, or 192 teaspoons
    return quantity / (4 * 48);
  } else {
    // catch-all for all other units, incl. teaspoon
    return quantity;
  }
}

function convertBetweenUnitsAndRound(quantity, inputUnit, outputUnit) {
  const quantityInTeaspoons = unitToTeaspoons(quantity, inputUnit);
  const quantityInOutputUnit = teaspoonsToUnit(quantityInTeaspoons, outputUnit);

  console.log("Unrounded: " + quantityInOutputUnit);

  const rounded = Math.round(quantityInOutputUnit * 100) / 100;

  console.log("Rounded: " + rounded);

  return rounded;
}
