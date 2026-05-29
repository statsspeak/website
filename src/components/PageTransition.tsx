import { useEffect, useState, type ReactNode } from "react";
import { useLenis } from "@studio-freight/react-lenis";

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

/**
 * Page transition — 200ms fade + 8px lift, ease-out. See DESIGN.md §6.4.
 *
 * On `pageKey` change: scroll to top via Lenis, then fade the new content in.
 * The 30ms timeout lets React commit the new tree before the transition begins
 * so the fade is visible (otherwise the new content paints already-opaque).
 */
export function PageTransition({ children, pageKey }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setIsVisible(false);
    const timer = window.setTimeout(() => setIsVisible(true), 30);
    return () => window.clearTimeout(timer);
  }, [pageKey]);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pageKey, lenis]);

  return (
    <div
      className={`transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}
