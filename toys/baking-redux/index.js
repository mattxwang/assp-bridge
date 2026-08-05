function appendToLocalStorage(key, value) {
  if (window.localStorage.getItem(key) === null) {
    // Key doesn't exist; create an array with just value.
    window.localStorage.setItem(key, JSON.stringify([value]));
  } else {
    // Key does exist; concatenate existing value to the end!
    const prevArr = JSON.parse(window.localStorage.getItem(key));
    const newArr = prevArr.concat([value]);
    window.localStorage.setItem(key, JSON.stringify(newArr));
  }
}

// TODO: consider having students handle cases where
//       JS is disabled
window.onload = (_) => {
  document.getElementById('volume-form').onsubmit = function (e) {
    e.preventDefault(); // required to stop the page from refreshing

    const quantity = document.getElementById('volume-quantity').value;
    const inputUnit = document.getElementById('volume-input-unit').value;
    const outputUnit = document.getElementById('volume-output-unit').value;

    const outputQuantity = convertBetweenUnitsAndRound(quantity, inputUnit, outputUnit);

    // Update the UI
    document.getElementById('volume-answer').innerHTML = quantity + " " + inputUnit + "s" + " is "
                                                         + outputQuantity + " " + outputUnit + "s";

    // Then, update localStorage
    appendToLocalStorage("quantities", quantity);
    appendToLocalStorage("inputUnits", inputUnit);
    appendToLocalStorage("outputUnits", outputUnit);

    console.log("local quantities: " + window.localStorage.getItem("quantities"));
    console.log("local inputUnits: " + window.localStorage.getItem("inputUnits"));
    console.log("local outputUnits: " + window.localStorage.getItem("outputUnits"));
  }
}
