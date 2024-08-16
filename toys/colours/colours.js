// Returns a random number in [0, max]
function nextInt(max) {
  return Math.floor(Math.random() * max);
}

// Returns a hex string for a hex digit.
// Assumption: 0 <= num <= 15
function hexDigitToString(num) {
  // TODO: consider if students should use toString
  //       or scaffold out a giant if-else chain
  //       that implements its core logic.
  return num.toString(16);
}

// Returns a hex string representing the number.
// Assumption: 0 <= num <= 255
function numToHex(num) {
  let firstDigit = Math.floor(num / 16);
  let secondDigit = Math.floor(num % 16);

  return hexDigitToString(firstDigit) + hexDigitToString(secondDigit);
}

// TODO: consider having students handle cases where
//       JS is disabled
window.onload = (_) => {
  let red = nextInt(255);
  let green = nextInt(255);
  let blue = nextInt(255);

  console.log("Random color (RGB): " + red + ", " + green + ", " + blue);

  let randomColor = "#" + numToHex(red) + numToHex(green) + numToHex(blue);
  let bgStyleStr = "background-color: " + randomColor; + ";";

  document.getElementById('app').setAttribute("style", bgStyleStr);
  document.getElementById('colour-message').innerHTML +=
    "<span class='colour-circle' style='" + bgStyleStr +  "'></span>";
  document.getElementById('colour-message').innerHTML += "&nbsp";
  document.getElementById('colour-message').innerHTML += randomColor;
}
