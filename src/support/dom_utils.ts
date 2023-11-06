export const getElementReact = (el) => {
  if (el == null) {
    return null;
  }

  el.getBoundingClientRect();
};

export const observeElement = (el, callback, visibilityValues = [1]) => {
  const options = {
    root: null,
    rootMargin: "",
    threshold: visibilityValues,
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
};