import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import StatsSpeakLogo from "./logo";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

/**
 * Top navigation — see DESIGN.md §5.5.
 * Bone surface (transparent at top, bone with hairline on scroll).
 * Logo (acts as Home) + 4 items. No pills, no shadows.
 */
export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { id: "services",     label: "Services" },
    { id: "case-studies", label: "Work" },
    { id: "about",        label: "About" },
    { id: "contact",      label: "Contact" },
  ];

  const navigate = (id: string) => {
    onPageChange(id);
    setIsMenuOpen(false);
  };

  return (
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
          className="flex items-center gap-3 text-ink"
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
                    "text-caption font-medium transition-colors duration-150",
                    active
                      ? "text-ink underline underline-offset-8 decoration-1 decoration-ink"
                      : "text-ink-700 hover:text-ink",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-ink"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-ink/60">
          <div className="ml-auto h-full w-[min(88vw,360px)] bg-ink px-6 py-6 text-bone">
            <div className="mb-10 flex items-center justify-between">
              <button
                onClick={() => navigate("home")}
                className="flex items-center gap-3 text-bone"
                aria-label="StatsSpeak — Home"
              >
                <StatsSpeakLogo width={24} height={32} />
                <span className="text-h4 font-sans font-semibold">Statsspeak</span>
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 -mr-2 text-bone"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="space-y-1">
            {menuItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.id)}
                    className={[
                      "block w-full text-left py-4 text-h3 transition-colors",
                      active ? "text-bone underline underline-offset-8" : "text-ink-300 hover:text-bone",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
