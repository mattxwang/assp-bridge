function loadPastConversions() {
  const pastConversionsElement = document.getElementById('past-conversions');

  if (window.localStorage.getItem('quantities') === null) {
    pastConversionsElement.innerHTML = "<li>no past conversions</li>";
  } else {
    const quantities = JSON.parse(window.localStorage.getItem('quantities'));
    const inputUnits = JSON.parse(window.localStorage.getItem('inputUnits'));
    const outputUnits = JSON.parse(window.localStorage.getItem('outputUnits'));

    for (let i = 0; i < quantities.length; i++) {
      const quantity = quantities[i];
      const inputUnit = inputUnits[i];
      const outputUnit = outputUnits[i];
      const outputQuantity = convertBetweenUnitsAndRound(quantity, inputUnit, outputUnit);
      pastConversionsElement.innerHTML += "<li>converted " + quantity + " " + inputUnit + "s to "
                                          + outputQuantity + " " + outputUnit + "s</li>";
    }
  }
}

window.onload = (_) => {
  loadPastConversions();

  document.getElementById('clear-history-button').onclick = function(e) {
    window.localStorage.clear();
    window.location.reload();
  }
};
