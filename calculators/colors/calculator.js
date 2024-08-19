function norm(x) {
  if (x <= 0.04045) {
    return x / 12.92;
  } else {
    return Math.pow(((x + 0.055) / 1.055), 2.4);
  }
}

function luminance(r, g, b) {
  return 0.2126 * norm(r/255) + 0.7152 * norm(g/255) + 0.0722 * norm(b/255);
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

function generateColorMessage(color) {
  let r = get8BitHexVal(color, 1);
  let g = get8BitHexVal(color, 3);
  let b = get8BitHexVal(color, 5);

  let bgColorStr = "background-color: " + color + ";";

  let message = "";

  message += "<div class='colour-message'>";
  message += "<span class='colour-circle' style='" + bgColorStr + "'></span>";
  message += "&nbsp; " + color;
  message += " | RGB: (" + r + ", " + g + ", " + b + ")";
  message += " | Luminance: " + to4DecPlaces(luminance(r, g, b));
  message += "</div>";

  return message;
}

function generateSummary(color1Hex, color2Hex) {
  let summary = "<h3>Summary</h3>";

  summary += generateColorMessage(color1Hex);
  summary += generateColorMessage(color2Hex);

  let contrast = contrastRatioFromHex(color1Hex, color2Hex);

  summary += "<p>contrast ratio: " + to4DecPlaces(contrast) + "</p>";

  if (contrast >= 7) {
    summary += '<p>these two colo(u)rs have great contrast. great job!</p>';
  } else if (contrast >= 4.5) {
    summary += '<p>these two colo(u)rs have good contrast.</p>';
  } else {
    summary += '<p>these two colo(u)rs have low contrast. consider using a different pair of colo(u)rs.</p>';
  }

  return summary;
}

function generatePangram(color1Hex, color2Hex) {
  // Fun fact: this is a "pangram":
  // https://en.wikipedia.org/wiki/Pangram

  let colorStr = "color: " + color1Hex + ";";
  let bgColorStr = "background-color: " + color2Hex + ";";

  let pangram = "<h3>Sample Text</h3>";
  pangram += "<p style='" + colorStr + bgColorStr + "padding: 1rem;'>";
  pangram += "How vexingly quick daft zebras jump!"
  pangram += "</p>";

  return pangram;
}

function generateContrastReport() {
  let reportDiv = document.getElementById('report');
  reportDiv.innerHTML = "<h2>Contrast Report</h2>"

  let color1Hex = document.getElementById('color1').value;
  let color2Hex = document.getElementById('color2').value;

  reportDiv.innerHTML += generateSummary(color1Hex, color2Hex);
  reportDiv.innerHTML += generatePangram(color1Hex, color2Hex);
}

window.onload = (_) => {
  document.getElementById('calculator').onsubmit = function (e) {
    e.preventDefault(); // required to stop the page from refreshing

    generateContrastReport()
  }

  generateContrastReport()
}
