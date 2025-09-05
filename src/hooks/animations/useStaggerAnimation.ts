import { useState, useRef, useCallback } from "react";

/**
 * Custom hook for staggered animations on lists of elements
 * @param {Object} options - Configuration options
 * @param {number} options.stagger - Delay between each item animation in ms
 * @param {number} options.threshold - Intersection observer threshold (0-1)
 * @param {number} options.duration - Animation duration in ms
 * @param {number} options.distance - Movement distance in pixels
 * @param {string} options.direction - Animation direction ('up', 'down', 'left', 'right')
 * @param {string} options.easing - CSS easing function
 * @returns {Object} { addRef, getItemStyle }
 */
export const useStaggerAnimation = (options = {}) => {
  const refs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(new Set());

  const {
    stagger = 100,
    threshold = 0.1,
    duration = 600,
    distance = 30,
    direction = "up",
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
  } = options;

  const addRef = useCallback(
    (element, index) => {
      if (element && !refs.current[index]) {
        refs.current[index] = element;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleItems((prev) => new Set([...prev, index]));
              }, index * stagger);
            }
          },
          { threshold }
        );

        observer.observe(element);
      }
    },
    [stagger, threshold]
  );

  const getTransform = (index) => {
    if (visibleItems.has(index)) return "translateY(0) translateX(0)";

    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  const getItemStyle = (index) => ({
    opacity: visibleItems.has(index) ? 1 : 0,
    transform: getTransform(index),
    transition: `all ${duration}ms ${easing}`,
  });

  return { addRef, getItemStyle };
};
