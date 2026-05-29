import { useRef } from "react";
import { useLenis } from "@studio-freight/react-lenis";

/**
 * Scroll progress — 1px ink line, no gradient. See DESIGN.md §6.
 *
 * Lenis fires this callback every frame, so we skip React's render cycle
 * and mutate a compositor-only property (scaleX) directly. No setState,
 * no layout, no paint — just a transform on a GPU-promoted layer.
 */
export function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    const el = fillRef.current;
    if (el) {
      el.style.transform = `scaleX(${progress})`;
    }
  });

  return (
    <div className="fixed top-0 left-0 w-full h-px z-50 bg-transparent pointer-events-none">
      <div
        ref={fillRef}
        className="h-full bg-ink origin-left"
        style={{ width: "100%", transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
