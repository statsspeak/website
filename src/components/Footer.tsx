import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Component as EtheralShadow } from "./ui/etheral-shadow";
import StatsSpeakLogo from "./logo";
import { FOOTER_PAGES, type PageChangeHandler } from "../pages";

interface FooterProps {
  onPageChange: PageChangeHandler;
}

const DISCIPLINES = [
  "Data Consultancy",
  "Data Engineering & Platforms",
  "Analytics, ML & AI",
  "Geospatial Intelligence",
  "Software Development",
] as const;

/**
 * Site footer — see DESIGN.md §11.3.
 * Ink surface with a teal ethereal shadow atmosphere and three column blocks:
 * brand + next-engagement CTA, contact + sitemap + disciplines, legal row.
 */
export function Footer({ onPageChange }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-bone">
      <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true">
        <EtheralShadow
          color="rgba(0, 172, 200, 0.48)"
          noise={{ opacity: 0.14, scale: 1.2 }}
          sizing="fill"
          showContent={false}
          style={{ mixBlendMode: "screen" }}
        />
      </div>
      <div className="absolute inset-0 statsspeak-footer-scrim" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 border-b border-bone/10 pb-16 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <StatsSpeakLogo width={28} height={38} />
              <span className="text-h4 font-sans text-bone">StatsSpeak</span>
            </div>
            <p className="text-body text-ink-300 max-w-md">
              A data consultancy and software development practice serving ministries, NGOs, and growth-stage enterprises across East Africa.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="text-micro text-logo-teal mb-8">Next engagement</div>
            <p className="max-w-2xl text-display-2 text-bone">
              Bring us the problem. We will help find the right instrument.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onPageChange("contact")}
                className="border-bone/50 text-bone hover:border-logo-teal hover:bg-logo-teal hover:text-ink"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-16 pt-16 lg:grid-cols-12 lg:pt-20">
          <div className="lg:col-span-5">
            <div className="text-micro text-ink-300 mb-6">Contact</div>
            <ul className="mt-10 space-y-4 text-caption text-ink-300">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@statsspeak.co.ke" className="footer-link">
                  info@statsspeak.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+254715644881" className="footer-link">
                  +254 715 644 881
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>10th Floor, Mercure, Upperhill, Nairobi</span>
              </li>
            </ul>
          </div>

          {/* Sitemap */}
          <div className="lg:col-span-3 lg:col-start-7">
            <div className="text-micro text-ink-300 mb-6">Index</div>
            <ul className="space-y-3">
              {FOOTER_PAGES.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className="footer-link text-body"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines */}
          <div className="lg:col-span-3">
            <div className="text-micro text-ink-300 mb-6">Disciplines</div>
            <ul className="space-y-3 text-body text-bone">
              {DISCIPLINES.map((discipline) => (
                <li key={discipline}>{discipline}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-ink-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-caption text-ink-300">
            © {year} StatsSpeak Limited. Nairobi, Kenya.
          </p>
          <div className="flex gap-8 text-caption text-ink-300">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
