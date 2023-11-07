import "./scroll-text.style.css";

export default () => {
  const rootEl = document.getElementById("root");

  const id = "scroll-text-section";
  const sectionEl = document.createElement("section");
  sectionEl.setAttribute("id", id);

  const textElList = [
    "scroll down",
    "to see text",
    "changes it's size",
    "according to scroll position",
  ].map((text) => {
    const textEl = document.createElement("p");
    textEl.classList.add("scroll-text");

    textEl.setAttribute("data-text", text);

    sectionEl.append(textEl);

    return textEl;
  });

  const screenHeight = screen.availHeight;
  const screenYCenter = screenHeight / 2;

  const handleUpdateTextElement = (el) => {
    const rect = el.getBoundingClientRect();
    const tillCenter = (rect.top % screenHeight) - screenYCenter;
    const deltaY = Math.abs(tillCenter);
    const scale = tillCenter > screenYCenter ? 0 : Math.abs(1 - deltaY / screenYCenter);
    const opacity = scale % 1;

    el.setAttribute('style', `--scale: ${scale}; --opacity: ${opacity};`);
  };

  document.addEventListener('scroll', (e) => {
    textElList.forEach(handleUpdateTextElement);
  });

  rootEl.append(sectionEl);

  textElList.forEach(handleUpdateTextElement);
};
