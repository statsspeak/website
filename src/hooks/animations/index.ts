// Barrel exports for animation hooks
export { useScrollReveal } from "./useScrollReveal";
export { useStaggerAnimation } from "./useStaggerAnimation";
export { useParallax } from "./useParallax";

// Animation presets for common use cases
export const ANIMATION_PRESETS = {
  // Scroll Reveal Presets
  fadeInUp: {
    direction: "up",
    distance: 50,
    duration: 800,
    delay: 0,
  },
  fadeInDown: {
    direction: "down",
    distance: 50,
    duration: 800,
    delay: 0,
  },
  fadeInLeft: {
    direction: "left",
    distance: 50,
    duration: 800,
    delay: 0,
  },
  fadeInRight: {
    direction: "right",
    distance: 50,
    duration: 800,
    delay: 0,
  },

  // Hero animations
  heroTitle: {
    direction: "up",
    distance: 80,
    duration: 1000,
    delay: 200,
  },

  // Section animations
  sectionTitle: {
    direction: "up",
    distance: 60,
    duration: 800,
    delay: 0,
  },

  // Stagger Presets
  fastStagger: {
    stagger: 100,
    duration: 600,
    distance: 30,
  },
  mediumStagger: {
    stagger: 150,
    duration: 700,
    distance: 40,
  },
  slowStagger: {
    stagger: 250,
    duration: 800,
    distance: 50,
  },

  // Parallax Presets
  backgroundParallax: -0.3,
  elementParallax: 0.5,
};

// Utility function to combine multiple animation styles
export const combineAnimationStyles = (...styles) => {
  return styles.reduce(
    (combined, style) => ({
      ...combined,
      ...style,
      transform: [combined.transform, style.transform]
        .filter(Boolean)
        .join(" "),
      transition: [combined.transition, style.transition]
        .filter(Boolean)
        .join(", "),
    }),
    {}
  );
};

// Utility to check if reduced motion is preferred
export const shouldReduceMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Hook to provide reduced motion aware animations
export const useReducedMotion = () => {
  return shouldReduceMotion();
};
