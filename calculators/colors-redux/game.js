const LYRICS = ["hey i just met you", "and this is crazy", "here's my number", "call me maybe"];

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

function randomColor() {
    let red = nextInt(255);
    let green = nextInt(255);
    let blue = nextInt(255);

    return "#" + numToHex(red) + numToHex(green) + numToHex(blue);
}

function updatePlaceholder(color1Hex, color2Hex) {
    const sampleTextEl = document.getElementById("sample-text");
    sampleTextEl.innerText = LYRICS[nextInt(LYRICS.length)];
    sampleTextEl.style = "color: " + color1Hex + "; background-color: " + color2Hex + ";";
}

window.onload = (_) => {
    let color1 = randomColor();
    let color2 = randomColor();
    updatePlaceholder(color1, color2);

    document.getElementById("next-btn").onclick = function (e) {
        color1 = randomColor();
        color2 = randomColor();
        updatePlaceholder(color1, color2);
    };

    document.getElementById("clear-history-button").onclick = function (e) {
        window.localStorage.clear();
        window.location.reload();
    };
};
