function generateSummary(color1Hex, color2Hex) {
    let summary = "<section><h2>Summary</h2>";

    summary += generateColorMessage(color1Hex, "div");
    summary += generateColorMessage(color2Hex, "div");

    let contrast = contrastRatioFromHex(color1Hex, color2Hex);

    summary += "<p>contrast ratio: " + to4DecPlaces(contrast) + "</p>";

    if (contrast >= 7) {
        summary += "<p>these colours have great contrast. great job!</p>";
    } else if (contrast >= 4.5) {
        summary += "<p>these colours have good contrast.</p>";
    } else {
        summary +=
            "<p>these two colours have low contrast. consider using a different pair of colo(u)rs.</p>";
    }

    summary += "</section>";

    return summary;
}

function generatePangram(color1Hex, color2Hex) {
    // Fun fact: this is a "pangram":
    // https://en.wikipedia.org/wiki/Pangram

    let colorStr = "color: " + color1Hex + ";";
    let bgColorStr = "background-color: " + color2Hex + ";";

    let pangram = "<section><h2>Sample Text</h2>";
    pangram += "<p style='" + colorStr + bgColorStr + "padding: 1rem;'>";
    pangram += "How vexingly quick daft zebras jump!";
    pangram += "</p></section>";

    return pangram;
}

function generateContrastReport(appendToStorage) {
    let reportDiv = document.getElementById("report");
    reportDiv.innerHTML = "";

    let color1Hex = document.getElementById("color1").value;
    let color2Hex = document.getElementById("color2").value;

    reportDiv.innerHTML += generateSummary(color1Hex, color2Hex);
    reportDiv.innerHTML += generatePangram(color1Hex, color2Hex);

    if (appendToStorage) {
        appendToLocalStorage("color1", color1Hex);
        appendToLocalStorage("color2", color2Hex);
    }
}

window.onload = (_) => {
    document.getElementById("calculator").onsubmit = function (e) {
        e.preventDefault(); // required to stop the page from refreshing

        generateContrastReport(true);
    };

    document.getElementById("swap").onclick = function () {
        const temp = document.getElementById("color1").value;
        document.getElementById("color1").value = document.getElementById("color2").value;
        document.getElementById("color2").value = temp;
    };

    generateContrastReport(false);
};
