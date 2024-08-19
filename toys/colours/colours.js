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

  // this portion is out of scope of the class - just intended to be fun!
  changeFavicon(randomColor);
}

// This uses an API called canvas to make the favicon (the icon in your
// tab) the random color. This is out of scope of the class - just
// a neat little touch :)
function changeFavicon(randomColor) {
  let canvas = document.createElement('canvas');
  canvas.height = 64;
  canvas.width = 64;

  let ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = randomColor;
  ctx.rect(0, 0, 64, 64);
  ctx.fill();

  let link = document.createElement('link');
  link.id = 'favicon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL();
  document.head.appendChild(link);
}
