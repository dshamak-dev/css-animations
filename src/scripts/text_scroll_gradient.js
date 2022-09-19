(() => {
  const useTextScrollGradientAnimation = (el, settings = {}) => {
    if (el == null) {
      return;
    }

    const tragetEl = el.children[0];
    const rect = getElementReact(el);
    const offsetY = (rect?.height || el.offsetHeight) / 3;
    const cL = tragetEl.classList;
    const acceleration = .02;
    // set animation class
    cL.add("animation_text-scroll-gradient");

    const setElOffset = ({ x, y }) => {
      const posY = -el.offsetHeight - Math.min(el.offsetHeight - y, el.offsetHeight);

      tragetEl.style.backgroundPosition = `${x}px ${posY}px`;
      tragetEl.style.transform = `translate(${x}px, ${y * -acceleration + offsetY}px)`;
    };

    // register scroll action callback
    document.addEventListener("scroll", (e) => {
      const sourceEl = e.target.scrollingElement;
      const x = sourceEl.scrollLeft;
      const y = sourceEl.scrollTop;
      // move content to max position on scroll
      setElOffset({ x, y });
    });

    setElOffset({ x: 0, y: 0 });
  };

  window.useTextScrollGradientAnimation = useTextScrollGradientAnimation;
})();
