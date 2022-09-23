(() => {
  const getLetterSize = (ratio) => {
    const minWidth = 0.32;
    let width = minWidth;

    if (ratio > .5) {
      width += ratio;
    }

    return { height: 0.4, width, unit: "em" };
  };

  const useTextOLetterAnimation = (coverEl) => {
    const letterElems = coverEl.querySelectorAll("[data-letter-animation]");

    letterElems.forEach((el) => {
      el.classList.add("letter-o-animation");

      const text = el.innerText;
      const letters = text.split("");

      el.innerHTML = "";

      letters.forEach((l) => {
        const lElem = document.createElement("span");

        switch (l.toLowerCase()) {
          case " ": {
            lElem.innerHTML = "&nbsp";
            break;
          }
          case "o": {
            lElem.classList.add("letter-o_cover");
            break;
          }
          default: {
            lElem.innerText = l;
          }
        }

        el.append(lElem);
      });
    });

    const update = (entries, observer) => {
      const ratio = entries[0].intersectionRatio;
      const scale = 40;
      const minFontSize = 75;
      const fontSize = minFontSize + (ratio > .5 ? (ratio * scale) : 0);
      const { width, height, unit } = getLetterSize(ratio);

      coverEl.setAttribute(
        "style",
        `font-size: ${fontSize}px; --letterHeight: ${height}${unit}; --letterWidth: ${width}${unit};`
      );
    };

    const values = [...new Array(100)].map((_, i) => i / 100);
    window.observElement(coverEl, update, values);
  };

  window.useTextOLetterAnimation = useTextOLetterAnimation;
})();
