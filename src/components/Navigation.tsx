import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import StatsSpeakLogo from "./logo";
import { PAGES, type Page, type PageChangeHandler } from "../pages";

interface NavigationProps {
  currentPage: Page;
  onPageChange: PageChangeHandler;
}

/**
 * Top navigation — see DESIGN.md §5.5.
 * Bone surface (transparent at top, bone with hairline on scroll).
 * Logo (acts as Home) + items from src/pages.ts. No pills, no shadows.
 *
 * Motion: a single soft ease (`cubic-bezier(0.32,0.72,0,1)`) is used everywhere
 * so the whole bar settles together. Durations are 300 ms — long enough to feel
 * refined, short enough to stay responsive. The active marker is an animated
 * underline bar that scales from the left on hover and persists on the active
 * item; the mobile drawer slides + fades rather than mounting instantly.
 */
const NAV_EASE = "cubic-bezier(0.32,0.72,0,1)";

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const navigate = (id: Page) => {
    onPageChange(id);
    setIsMenuOpen(false);
  };

  return (
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

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-ink transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-marine active:translate-y-0"
          style={{ transitionTimingFunction: NAV_EASE }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="relative block h-5 w-5">
            <Menu
              className={[
                "absolute inset-0 h-5 w-5 transition-[opacity,transform] duration-300",
                isMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0",
              ].join(" ")}
              style={{ transitionTimingFunction: NAV_EASE }}
            />
            <X
              className={[
                "absolute inset-0 h-5 w-5 transition-[opacity,transform] duration-300",
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90",
              ].join(" ")}
              style={{ transitionTimingFunction: NAV_EASE }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer — always rendered so the slide animates both ways. */}
      <div
        className={[
          "md:hidden fixed inset-0 z-50",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={[
            "absolute inset-0 bg-ink/60 transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transitionTimingFunction: NAV_EASE }}
        />

        {/* Panel */}
        <div
          className={[
            "absolute right-0 top-0 h-full w-[min(88vw,360px)] bg-ink px-6 py-6 text-bone",
            "will-change-transform transition-transform duration-500",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          style={{ transitionTimingFunction: NAV_EASE }}
        >
          <div className="mb-10 flex items-center justify-between">
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-3 text-bone transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{ transitionTimingFunction: NAV_EASE }}
              aria-label="StatsSpeak — Home"
            >
              <StatsSpeakLogo width={24} height={32} />
              <span className="text-h4 font-sans font-semibold">Statsspeak</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2 text-bone transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-logo-teal active:translate-y-0"
              style={{ transitionTimingFunction: NAV_EASE }}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ul className="space-y-1">
            {PAGES.map((item, i) => {
              const active = currentPage === item.id;
              return (
                <li
                  key={item.id}
                  className={[
                    "transition-[opacity,transform] duration-500",
                    isMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4",
                  ].join(" ")}
                  style={{
                    transitionTimingFunction: NAV_EASE,
                    transitionDelay: isMenuOpen ? `${120 + i * 40}ms` : "0ms",
                  }}
                >
                  <button
                    onClick={() => navigate(item.id)}
                    className={[
                      "group relative block w-full py-4 text-left text-h3",
                      "transition-[color,transform] duration-300",
                      "hover:translate-x-1 active:translate-x-0",
                      active ? "text-logo-teal" : "text-ink-300 hover:text-bone",
                    ].join(" ")}
                    style={{ transitionTimingFunction: NAV_EASE }}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={[
                        "pointer-events-none absolute left-0 -bottom-0.5 h-px w-12 origin-left",
                        active ? "bg-logo-teal" : "bg-bone",
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
        </div>
      </div>
    </header>
  );
}
