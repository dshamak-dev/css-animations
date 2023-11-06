import "./gradient.style.css";

export default () => {
  const root = document.getElementById("gradient");

  const colorValues = [
    `19, 178, 211`,
    `212, 195, 42`,
    `124, 83, 159`,
    `239, 222, 218`,
    `229, 163, 173`,
    `137, 212, 42`,
  ];

  const rootStyles = colorValues
    .map((value, index) => {
      return `--color${index + 1}: ${value};`;
    })
    .join("");

  root.setAttribute("style", rootStyles);

  const paletteItemsCount = Math.floor(colorValues.length * 1.3);

  const paletteEl = root.querySelector("#palette");

  const rotationStep = 360 / paletteItemsCount;
  const _reverseFactor = Math.floor(paletteItemsCount / 4);

  const durations = [4, 6, 8, 9, 10, 12];

  new Array(paletteItemsCount).fill(null).forEach((_, index) => {
    const _el = document.createElement("div");
    _el.classList.add("palette-color");

    const elNum = index + 1;
    const colorNum = elNum % colorValues.length;
    const angle = (rotationStep * index) % 360;
    const _operation = index % _reverseFactor === 0 ? "-" : "+";

    const _durationIndex = Math.floor(Math.random() * durations.length);
    const _duration = durations[_durationIndex];

    const _style = `
    --color: var(--color${colorNum});
    --start-angle: ${angle}deg;
    --end-angle: calc(var(--start-angle) ${_operation} 360deg);
    --duration: ${_duration}s;
    --delay: 0s;`;

    _el.setAttribute("style", _style);

    paletteEl.append(_el);
  });
};
