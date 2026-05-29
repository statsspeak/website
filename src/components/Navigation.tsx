import { useState, useEffect } from "react";
import StatsSpeakLogo from "./logo";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

/**
 * Navigation — see DESIGN.md §5.5.
 * Desktop: top bar with brand + horizontal items.
 * Mobile: top bar with brand only; a fixed bottom tab bar carries the items.
 */
export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { id: "home",         label: "Home" },
    { id: "services",     label: "Services" },
    { id: "case-studies", label: "Work" },
    { id: "about",        label: "About" },
    { id: "contact",      label: "Contact" },
  ];

  const navigate = (id: string) => {
    onPageChange(id);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40",
          "transition-[background-color,border-color,height] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          scrolled
            ? "bg-bone/95 backdrop-blur-sm border-b border-line"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <nav
          className={[
            "mx-auto max-w-[1280px] px-6 lg:px-12",
            "flex items-center justify-between",
            scrolled ? "h-16" : "h-20",
            "transition-[height] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          ].join(" ")}
          aria-label="Primary"
        >
          {/* Brand → Home */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-3 text-ink transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 active:translate-y-0"
            aria-label="StatsSpeak — Home"
          >
            <StatsSpeakLogo width={24} height={32} />
            <span className="text-h4 font-sans font-semibold text-ink tracking-tight">
              Statsspeak
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.id)}
                    className={[
                      "text-caption font-medium transition-[color,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 active:translate-y-0",
                      active
                        ? "text-marine underline underline-offset-8 decoration-1 decoration-marine"
                        : "text-ink-700 hover:text-marine-700",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
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
          {menuItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => navigate(item.id)}
                  className={[
                    "w-full py-3 text-caption font-medium transition-[color,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:translate-y-0",
                    active
                      ? "text-marine underline underline-offset-8 decoration-1 decoration-marine"
                      : "text-ink-700",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
