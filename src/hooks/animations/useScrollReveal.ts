import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for scroll-triggered reveal animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection observer threshold (0-1)
 * @param {number} options.delay - Animation delay in ms
 * @param {number} options.duration - Animation duration in ms
 * @param {number} options.distance - Movement distance in pixels
 * @param {string} options.direction - Animation direction ('up', 'down', 'left', 'right')
 * @param {string} options.easing - CSS easing function
 * @returns {Object} { ref, style, isVisible }
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    threshold = 0.1,
    delay = 0,
    duration = 800,
    distance = 50,
    direction = "up",
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [threshold, delay]);

  const getTransform = () => {
    if (isVisible) return "translateY(0) translateX(0)";

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

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `all ${duration}ms ${easing}`,
  };

  return { ref, style, isVisible };
};
