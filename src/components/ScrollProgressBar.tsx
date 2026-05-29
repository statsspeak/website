import { useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";

/**
 * Scroll progress — 1px ink line, no gradient. See DESIGN.md §6.
 *
 * Reads scroll progress from Lenis (which is also the scroll engine the rest
 * of the app uses) so the bar tracks the same easing the user sees.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useLenis(({ progress }) => {
    setProgress(progress * 100);
  });

  return (
    <div className="fixed top-0 left-0 w-full h-px z-50 bg-transparent">
      <div
        className="h-full bg-ink"
        style={{ width: `${progress}%`, transition: "width 100ms linear" }}
      />
    </div>
  );
}
