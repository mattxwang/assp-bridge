function norm(x) {
    if (x <= 0.04045) {
        return x / 12.92;
    } else {
        return Math.pow((x + 0.055) / 1.055, 2.4);
    }
}

function luminance(r, g, b) {
    return 0.2126 * norm(r / 255) + 0.7152 * norm(g / 255) + 0.0722 * norm(b / 255);
}

function contrastRatio(r1, g1, b1, r2, g2, b2) {
    let l1 = luminance(r1, g1, b1) + 0.05;
    let l2 = luminance(r2, g2, b2) + 0.05;

    if (l1 > l2) {
        return l1 / l2;
    } else {
        return l2 / l1;
    }
}

function contrastRatioFromHex(color1Hex, color2Hex) {
    let r1 = get8BitHexVal(color1Hex, 1);
    let g1 = get8BitHexVal(color1Hex, 3);
    let b1 = get8BitHexVal(color1Hex, 5);

    let r2 = get8BitHexVal(color2Hex, 1);
    let g2 = get8BitHexVal(color2Hex, 3);
    let b2 = get8BitHexVal(color2Hex, 5);

    return contrastRatio(r1, g1, b1, r2, g2, b2);
}

function hexCharToDigit(ch) {
    if (ch == "a") return 10;
    if (ch == "b") return 11;
    if (ch == "c") return 12;
    if (ch == "d") return 13;
    if (ch == "e") return 14;
    if (ch == "f") return 15;
    return Number(ch);
}

function get8BitHexVal(hex, startIndex) {
    let first = hex[startIndex];
    let second = hex[startIndex + 1];
    return hexCharToDigit(first) * 16 + hexCharToDigit(second);
}

function to4DecPlaces(num) {
    return Math.round(num * 10000) / 10000;
}

function generateColorMessage(color, wrapper) {
    let r = get8BitHexVal(color, 1);
    let g = get8BitHexVal(color, 3);
    let b = get8BitHexVal(color, 5);

    let bgColorStr = "background-color: " + color + ";";

    let message = "";

    message += "<" + wrapper + " class='colour-message'>";
    message += "<span class='colour-circle' style='" + bgColorStr + "'></span>";
    message += "&nbsp; " + color;
    message += " | RGB: (" + r + ", " + g + ", " + b + ")";
    message += "</" + wrapper + ">";

    return message;
}

function updateGameStats() {
    const numCorrect = Number(window.localStorage.getItem("numCorrect"));
    const numWrong = Number(window.localStorage.getItem("numWrong"));

    if (numCorrect === 0 && numWrong === 0) {
        document.getElementById("num-correct").innerHTML = 0;
        document.getElementById("num-wrong").innerHTML = 0;
        document.getElementById("win-pct").innerHTML = "n/a";
    } else {
        document.getElementById("num-correct").innerHTML = numCorrect;
        document.getElementById("num-wrong").innerHTML = numWrong;
        document.getElementById("win-pct").innerHTML =
            to4DecPlaces((numCorrect / (numCorrect + numWrong)) * 100) + "%";
    }
}

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
