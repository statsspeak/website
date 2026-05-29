import { useEffect, useState } from "react";
import StatsSpeakLogo from "./logo";
import { PAGES, type Page, type PageChangeHandler } from "../pages";

interface NavigationProps {
  currentPage: Page;
  onPageChange: PageChangeHandler;
}

/**
 * Navigation — see DESIGN.md §5.5.
 * Desktop: top bar (brand + horizontal items, bone surface with hairline on scroll).
 * Mobile: top bar carries the brand only; a fixed bottom tab bar carries the items.
 *
 * Motion: single soft ease (`cubic-bezier(0.32,0.72,0,1)`) at 300 ms so the whole
 * bar settles together. Active marker is an underline that scales from the left
 * on hover and persists on the active item, on both desktop and mobile.
 */
const NAV_EASE = "cubic-bezier(0.32,0.72,0,1)";

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: Page) => {
    onPageChange(id);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40",
          "transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "bg-bone/95 backdrop-blur-sm border-b border-line"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
        style={{ transitionTimingFunction: NAV_EASE }}
      >
        <nav
          className={[
            "mx-auto max-w-[1280px] px-6 lg:px-12",
            "flex items-center justify-between",
            scrolled ? "h-16" : "h-20",
            "transition-[height] duration-500",
          ].join(" ")}
          style={{ transitionTimingFunction: NAV_EASE }}
          aria-label="Primary"
        >
          {/* Brand → Home */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-3 text-ink will-change-transform transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{ transitionTimingFunction: NAV_EASE }}
            aria-label="StatsSpeak — Home"
          >
            <StatsSpeakLogo width={24} height={32} />
            <span className="text-h4 font-sans font-semibold text-ink tracking-tight">
              Statsspeak
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {PAGES.map((item) => {
              const active = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.id)}
                    className={[
                      "group relative inline-block text-caption font-medium will-change-transform",
                      "transition-[color,transform] duration-300",
                      "hover:-translate-y-0.5 active:translate-y-0",
                      active ? "text-marine" : "text-ink-700 hover:text-marine",
                    ].join(" ")}
                    style={{ transitionTimingFunction: NAV_EASE }}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={[
                        "pointer-events-none absolute left-0 right-0 -bottom-2 h-px origin-left bg-marine",
                        "transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      ].join(" ")}
                      style={{ transitionTimingFunction: NAV_EASE }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bone/95 backdrop-blur-sm border-t border-line pb-[env(safe-area-inset-bottom)]"
        aria-label="Primary"
      >
        <ul className="flex items-stretch justify-between px-2">
          {PAGES.map((item) => {
            const active = currentPage === item.id;
            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => navigate(item.id)}
                  className={[
                    "group relative w-full py-3 text-caption font-medium",
                    "transition-[color,transform] duration-300 active:translate-y-0",
                    active ? "text-marine" : "text-ink-700 hover:text-marine",
                  ].join(" ")}
                  style={{ transitionTimingFunction: NAV_EASE }}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-3 right-3 bottom-1 h-px origin-left bg-marine",
                      "transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                    style={{ transitionTimingFunction: NAV_EASE }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
