const LYRICS = [
    "hey i just met you",
    "and this is crazy",
    "here's my number",
    "call me maybe",
    "dancing queen",
    "feel the beat",
    "from the tambourine",
    "is it that sweet",
    "did a full 180",
    "you, moonlight",
    "you're my starlight",
    "sit down, be humble",
    "i see dead people",
    "debí tirar más fotos",
    "de cuando te tuve",
    "me enseñaste a bailar",
    "no te puedo olvidar",
    "no te puedo borrar",
];

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

function checkGuess(contrastRatio, userGuessedGood) {
    let guessCorrect = true;

    if (contrastRatio > 4.5 && !userGuessedGood) {
        guessCorrect = false;
    } else if (contrastRatio < 4.5 && userGuessedGood) {
        guessCorrect = false;
    }

    return guessCorrect;
}

function processGuess(userGuessedGood) {
    const color1Hex = window.localStorage.getItem("color1Hex");
    const color2Hex = window.localStorage.getItem("color2Hex");

    const contrast = contrastRatioFromHex(color1Hex, color2Hex);
    const guessCorrect = checkGuess(contrast, userGuessedGood);

    let guessOutcome = "<p>you guessed correctly!</p>";

    if (guessCorrect) {
        const numCorrect = Number(window.localStorage.getItem("numCorrect"));
        window.localStorage.setItem("numCorrect", numCorrect + 1);
    } else {
        const numWrong = Number(window.localStorage.getItem("numWrong"));
        window.localStorage.setItem("numWrong", numWrong + 1);

        guessOutcome = "<p>you guessed incorrectly :(</p>";
    }

    const resultBox = document.getElementById("result-box");

    resultBox.innerHTML =
        "<div>" +
        generateColorMessage(color1Hex, "p") +
        generateColorMessage(color2Hex, "p") +
        "<p>actual contrast: " +
        to4DecPlaces(contrast) +
        "</p>" +
        guessOutcome +
        "</div>";

    document.getElementById("info-box").style = "display: none;";

    updateGameStats();
}

function setNewColors() {
    const color1Hex = randomColor();
    const color2Hex = randomColor();

    window.localStorage.setItem("color1Hex", color1Hex);
    window.localStorage.setItem("color2Hex", color2Hex);

    updatePlaceholder(color1Hex, color2Hex);
}

window.onload = (_) => {
    updateGameStats();
    setNewColors();

    document.getElementById("next-btn").onclick = function () {
        setNewColors();
        document.getElementById("info-box").style = "";
        document.getElementById("result-box").innerHTML = "";
    };

    document.getElementById("yes-btn").onclick = function () {
        processGuess(true);
    };

    document.getElementById("no-btn").onclick = function () {
        processGuess(false);
    };
};
