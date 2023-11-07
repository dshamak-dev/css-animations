import "./parallax.style.css";
import image from "./parallax-image.webp";

export default () => {
  const rootEl = document.getElementById("root");

  const id = "parallax-section";
  const sectionEl = document.createElement("section");
  sectionEl.setAttribute("id", id);

  const imageEl = document.createElement("div");
  imageEl.classList.add("parallax-image");
  imageEl.style.backgroundImage = `url(${image})`;
  sectionEl.append(imageEl);

  const cloudCoverEl = document.createElement("div");
  cloudCoverEl.classList.add("parallax-cloud-cover");

  let clouds = [];
  for (let i = 0; i < 3; i++) {
    const cloudEl = document.createElement("div");
    cloudEl.classList.add("parallax-cloud");

    cloudCoverEl.append(cloudEl);

    clouds.push(cloudEl);
  }

  const screenHeight = screen.availHeight;
  const screenYCenter = screenHeight / 2;
  const factors = [0.8, 0.4, 0.6];

  const handleScroll = (elements) => {
    const scrollTop = document.scrollingElement?.scrollTop || 0;
    const rect = cloudCoverEl.getBoundingClientRect();
    const topPos = rect.top;
    const tillCenter = topPos;

    // console.log({ rect, topPos, scrollTop, screenYCenter, tillCenter });

    elements.forEach((el, index) => {
      const factor = factors[index % factors.length]
      const offset = topPos * -factor;

      el.setAttribute("style", `--offset: ${offset}px;`);
    });
  };

  document.addEventListener("scroll", (e) => {
    handleScroll(clouds);
  });

  sectionEl.append(cloudCoverEl);

  rootEl.append(sectionEl);
};
