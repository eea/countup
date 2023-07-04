export const easings = {
  easeInCubic: (t, b, c, d) => {
    t /= d;
    return c * t * t * t + b;
  },
  easeOutCubic: (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
  linear: (t, b, c, d) => {
    return (c * t) / d + b;
  },
};

export const defaultEasing = easings.easeOutCubic;

export const getEasing = (easing) =>
  typeof easing === 'function' ? easing : easings[easing];
