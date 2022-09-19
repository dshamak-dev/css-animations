const ANIMATION_TYPES = {
  TEXT_SCROLL_GRADIENT: "text-scroll-gradient",
  TEXT_O_LETTER: "text-o-letter",
  PARALLAX: "parallax",
};
const ANIMATION_TYPE_METHODS = {
  [ANIMATION_TYPES.TEXT_SCROLL_GRADIENT]: 'useTextScrollGradientAnimation',
  [ANIMATION_TYPES.TEXT_O_LETTER]: 'useTextOLetterAnimation',
  [ANIMATION_TYPES.PARALLAX]: 'useParallax'
};

window.shared = {};

(() => {
  const PACKAGE_PATH = "./src/scripts";
  const PACKAGES = [
    "dom_utils",
    "text_scroll_gradient",
    "text_o_letter_animation",
    "parallax",
  ];
  const SECTIONS = [
    {
      query: "#welcome-section",
      animationType: ANIMATION_TYPES.TEXT_SCROLL_GRADIENT,
      settings: {},
    },
    {
      query: "#intro-section",
      animationType: ANIMATION_TYPES.TEXT_O_LETTER,
      settings: {},
    },
  ];

  const importPackage = (fileName) => {
    const el = document.createElement("script");
    el.src = `${PACKAGE_PATH}/${fileName}.js`;

    document.body.append(el);

    return new Promise((res, rej) => {
      el.onload = res;
      el.onerror = rej;
    });
  };
  const init = () => {
    SECTIONS.forEach((it) => {
      const element = document.querySelector(it.query);
      const animationMethod = window[ANIMATION_TYPE_METHODS[it.animationType]];

      if (element == null || animationMethod == null) {
        return;
      }

      animationMethod(element, it.settings);
    });
  };

  Promise.all(PACKAGES.map(importPackage)).then(init);
})();
