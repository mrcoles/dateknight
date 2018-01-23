export const scrollDelayed = className => {
  window.setTimeout(() => scrollTo(className), 200);
};

export const scrollTo = className => {
  // HACK - make sure something is within the viewport
  let elt = document.getElementsByClassName(className)[0];
  if (elt) {
    // get global offset
    let top = 0;
    let parent = elt;
    do {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    } while (parent);

    // get scrollbar location
    let scroll_top = document.documentElement.scrollTop;

    let window_height = window.innerHeight;

    if (scroll_top < top - (window_height - 100)) {
      window.scrollTo(0, top - 20);
    }
  }
};
