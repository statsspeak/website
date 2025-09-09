import { useState, useRef, useCallback, type CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right";

interface StaggerOptions {
  stagger?: number;
  threshold?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  easing?: string;
}

interface UseStaggerAnimationReturn {
  addRef: (element: HTMLElement | null, index: number) => void;
  getItemStyle: (index: number) => CSSProperties;
}

/**
 * Custom hook for staggered animations on lists of elements
 */
export const useStaggerAnimation = (
  options: StaggerOptions = {}
): UseStaggerAnimationReturn => {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const {
    stagger = 100,
    threshold = 0.1,
    duration = 600,
    distance = 30,
    direction = "up",
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
  } = options;

  const addRef = useCallback(
    (element: HTMLElement | null, index: number) => {
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

  const getTransform = (index: number): string => {
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

  const getItemStyle = (index: number): CSSProperties => ({
    opacity: visibleItems.has(index) ? 1 : 0,
    transform: getTransform(index),
    transition: `all ${duration}ms ${easing}`,
  });

  return { addRef, getItemStyle };
};
