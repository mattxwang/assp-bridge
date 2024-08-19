const recalcFontSize = (brat) => {

  const divBound = brat.clientHeight;
  const textHeight = brat.scrollHeight;

  if (divBound - textHeight > 200) {
    // safe to use 20vw
    brat.style.fontSize = "20vw";

    return;
  }

  if (divBound < textHeight) {
    // overflowing -- try a a smaller font
    // relies on brat.style.fontSize existing and being in vw
    const currFontSize = brat.style.fontSize;
    let fontVal = Number(currFontSize.slice(0, currFontSize.length - 2));

    if (fontVal <= 0) {
      console.error("something's broken, LOL");
      return;
    }

    if (fontVal < 10) {
      fontVal -= 0.5;
    } else {
      fontVal -= 1;
    }

    brat.style.fontSize = fontVal + "vw";

    // awful hack - since there's no "onStyleChange"
    window.setTimeout(() => recalcFontSize(brat), 50)
  }
}

window.onload = (_) => {
  const brat = document.getElementById('brat');
  recalcFontSize(brat);
  brat.oninput = () => {
    recalcFontSize(brat)
  }

  document.getElementById('brat-color').oninput = () => {
    document.getElementById('brat-container').style.backgroundColor = document.getElementById('brat-color').value;
  }

  document.getElementById('delete-sidebar').onclick = () => {
    document.getElementById('brat-sidebar').remove()
  }
}
