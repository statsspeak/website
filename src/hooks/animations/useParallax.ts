import { useState, useRef, useEffect } from "react";

/**
 * Custom hook for parallax scroll effects
 * @param {number} speed - Parallax speed multiplier (-1 to 1, negative for opposite direction)
 * @param {Object} options - Configuration options
 * @param {boolean} options.disabled - Disable parallax on mobile/reduced motion
 * @param {number} options.offset - Initial offset value
 * @returns {Object} { ref, style }
 */
type Options = {
  offset?: number;
  disabled: boolean;
};

export const useParallax = (
  speed = 0.5,
  options: Options = { disabled: false }
) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(options.offset || 0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDisabled(mediaQuery.matches || options.disabled);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDisabled(e.matches || options.disabled);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [options.disabled]);

  useEffect(() => {
    if (isDisabled) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const element: Element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate if element is in viewport
      if (
        scrollY + windowHeight > elementTop &&
        scrollY < elementTop + elementHeight
      ) {
        const relativePos =
          (scrollY - elementTop + windowHeight) /
          (windowHeight + elementHeight);
        setOffset(relativePos * speed * 100);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [speed, isDisabled]);

  return {
    ref,
    style: {
      transform: isDisabled ? "none" : `translateY(${offset}px)`,
      willChange: isDisabled ? "auto" : "transform",
    },
  };
};
