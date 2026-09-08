/*
  Name: matt wang + you!
  
  This is the scaffold color contrast example we'll use throughout week 3. This is
  the "first" scaffold, which only uses features discussed in week 2, and implements
  the project 2 spec reasonably well. You are free to edit and reuse this content
  for project 3!
  */

// TODO: in your activity, you'll:
// 1. Make the contrast report appear on page load.
// 2. Add a "swap colors" button.
// You'll add those here!
window.onload = (_) => {
    document.getElementById("calculate").onclick = function () {
        writeContrastReport();
    };
};

// These functions are used to update the content on the main page.

// Returns HTML that represents a single color,
// which includes a circle (whose background color is the color) and
// the hex + RGB representations of that color.
// The `color` argument should be a hex string.
// The `wrapper` parameter should be the name of an HTML element
// that "wraps" the entire content, like a div or an h2
function generateColorMessage(color, wrapper) {
    let r = get8BitHexVal(color, 1);
    let g = get8BitHexVal(color, 3);
    let b = get8BitHexVal(color, 5);

    let bgColorStr = "background-color: " + color + ";";

    let message = "<" + wrapper + " class='colour-message'>";
    message += "<span class='colour-circle' style='" + bgColorStr + "'></span>";
    message += "&nbsp; " + color;
    message += " | RGB: (" + r + ", " + g + ", " + b + ")";
    message += "</" + wrapper + ">";

    return message;
}

// Returns an HTML text example that has color1Hex as the foreground,
// and color2Hex as the background.
// Fun fact: a "pangram" contains all letters in the alphabet at least once.
// It's very helpful in typography!
// See: https://en.wikipedia.org/wiki/Pangram
function generatePangram(color1Hex, color2Hex) {
    let colorStr = "color: " + color1Hex + ";";
    let bgColorStr = "background-color: " + color2Hex + ";";

    let pangram = "<section><h2>Sample Text</h2>";
    pangram += "<p style='" + colorStr + bgColorStr + "padding: 1rem;'>";
    pangram += "How vexingly quick daft zebras jump!"; // A short pangram!
    pangram += "</p></section>";

    return pangram;
}

// Returns an HTML text summary (at h2-level, within a section)
// of the contrast between color1Hex and color2Hex.
function generateSummary(color1Hex, color2Hex) {
    let summary = "<section><h2>Summary</h2>";

    summary += generateColorMessage(color1Hex, "div");
    summary += generateColorMessage(color2Hex, "div");

    let contrast = contrastRatioFromHex(color1Hex, color2Hex);

    summary += "<p>contrast ratio: " + to1DecPlace(contrast) + "</p>";

    if (contrast >= 7) {
        summary += "<p>these colours have great contrast. great job!</p>";
    } else if (contrast >= 4.5) {
        summary += "<p>these colours have good contrast.</p>";
    } else {
        summary +=
            "<p>these two colours have low contrast." +
            " consider using a different pair of colo(u)rs.</p>";
    }

    summary += "</section>";

    return summary;
}

// Gets colors from #color1 and #color2, then overwites #report with a contrast report:
// a summary of the contrast ratio statistics and a pangram example.
function writeContrastReport() {
    let reportDiv = document.getElementById("report");
    reportDiv.innerHTML = "";

    let color1Hex = document.getElementById("color1").value;
    let color2Hex = document.getElementById("color2").value;

    reportDiv.innerHTML += generateSummary(color1Hex, color2Hex);
    reportDiv.innerHTML += generatePangram(color1Hex, color2Hex);
}

// All of the following code is about calculating the color contrast ratio.
// You aren't responsible for knowing how this works, though it mostly
// only uses ideas we've already learned in class (and the definition
// provided in the WCAG 2.1 spec).
// As a starting point, see
// https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum#dfn-contrast-ratio

// Applies the normalization function defined in WCAG 2.1's contrast ratio. See:
// https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum#dfn-relative-luminance
function norm(x) {
    if (x <= 0.04045) {
        return x / 12.92;
    } else {
        return Math.pow((x + 0.055) / 1.055, 2.4);
    }
}

// Returns the relative luminance for a color with RGB values r, g, b,
// after applying normalization. For more, see the following:
// https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum#dfn-relative-luminance
function luminance(r, g, b) {
    return 0.2126 * norm(r / 255) + 0.7152 * norm(g / 255) + 0.0722 * norm(b / 255);
}

// Returns the WCAG 2.1 contrast ratio between r1, g1, b1 and r2, g2, b2
// (expressed in decimal); handles both cases where one color is lighter than the other.
function contrastRatio(r1, g1, b1, r2, g2, b2) {
    let l1 = luminance(r1, g1, b1) + 0.05;
    let l2 = luminance(r2, g2, b2) + 0.05;

    if (l1 > l2) {
        return l1 / l2;
    } else {
        return l2 / l1;
    }
}

// Returns the WCAG 2.1 contrast ratio for color1Hex and color2Hex.
function contrastRatioFromHex(color1Hex, color2Hex) {
    let r1 = get8BitHexVal(color1Hex, 1);
    let g1 = get8BitHexVal(color1Hex, 3);
    let b1 = get8BitHexVal(color1Hex, 5);

    let r2 = get8BitHexVal(color2Hex, 1);
    let g2 = get8BitHexVal(color2Hex, 3);
    let b2 = get8BitHexVal(color2Hex, 5);

    return contrastRatio(r1, g1, b1, r2, g2, b2);
}

// Gets the decimal value of a 2-digit hex value from a
// color hex string, starting at `startIndex`.
// For example,
//   - get8BitHexVal("#8ace00", 1) would return 138, which is 0x8a
//   - get8BitHexVal("#8ace00", 3) would return 206, which is 0xce
//   - get8BitHexVal("#8ace00", 5) would return 0, which is 0x00
function get8BitHexVal(hexStr, startIndex) {
    let first = hexStr[startIndex];
    let second = hexStr[startIndex + 1];
    return Number("0x" + first) * 16 + Number("0x" + second);
}

// Rounds `num` to 1 decimal place.
function to1DecPlace(num) {
    return Math.round(num * 10) / 10;
}
