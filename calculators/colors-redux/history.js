function loadPastConversions() {
    const totalColorsEl = document.getElementById("total-colors");
    const averageContrastEl = document.getElementById("average-contrast");
    const pastColorsEl = document.getElementById("past-colors");

    if (window.localStorage.getItem("color1") === null) {
        totalColorsEl.innerHTML = 0;
        averageContrastEl.innerHTML = "n/a";
    } else {
        const color1s = JSON.parse(window.localStorage.getItem("color1"));
        const color2s = JSON.parse(window.localStorage.getItem("color2"));

        totalColorsEl.innerHTML = color1s.length + color2s.length;
        let totalContrast = 0;

        for (let i = color1s.length - 1; i >= 0; i--) {
            const color1Hex = color1s[i];
            const color2Hex = color2s[i];
            const contrast = contrastRatioFromHex(color1Hex, color2Hex);

            totalContrast += contrast;

            pastColorsEl.innerHTML +=
                "<li> comparison #" +
                (i + 1) +
                ": <ul>" +
                generateColorMessage(color1Hex, "li") +
                generateColorMessage(color2Hex, "li") +
                "<li>contrast: " +
                to4DecPlaces(contrast) +
                "</li>" +
                "</ul></li>";
        }

        averageContrastEl.innerHTML = to4DecPlaces(totalContrast / color1s.length);
    }
}

window.onload = (_) => {
    loadPastConversions();

    document.getElementById("clear-history-button").onclick = function (e) {
        window.localStorage.clear();
        window.location.reload();
    };
};
