export const EASE = {
  out:    [0.16, 1, 0.3, 1]  as [number, number, number, number],
  inOut:  [0.45, 0, 0.55, 1] as [number, number, number, number],
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

export const DUR = {
  fast:     0.2,
  normal:   0.45,
  emphasis: 0.65,
  entrance: 0.9,
};

// Stagger container: children reveal sequentially
export const staggerContainer = (stagger = 0.07, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

// Generic item that fades up
export const fadeUpItem = (duration = DUR.normal) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE.out },
  },
});

// Item that fades in (no translate)
export const fadeItem = (duration = DUR.normal) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration, ease: EASE.out },
  },
});

// Clip-path reveal: text slides up from underneath
export const clipRevealItem = (duration = DUR.emphasis) => ({
  hidden: { clipPath: "inset(100% 0 0 0)", y: "30%" },
  show: {
    clipPath: "inset(0% 0 0 0)",
    y: "0%",
    transition: { duration, ease: EASE.out },
  },
});
