import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import StatsSpeakLogo from "./components/logo";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const year = new Date().getFullYear();

  const renderPage = () => {
    switch (currentPage) {
      case "home":         return <HomePage onPageChange={setCurrentPage} />;
      case "services":     return <ServicesPage onPageChange={setCurrentPage} />;
      case "case-studies": return <CaseStudiesPage onPageChange={setCurrentPage} />;
      case "about":        return <AboutPage onPageChange={setCurrentPage} />;
      case "contact":      return <ContactPage onPageChange={setCurrentPage} />;
      default:             return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-bone text-ink-800">
      <ScrollProgressBar />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <PageTransition pageKey={currentPage}>
        <main className="w-full">{renderPage()}</main>
      </PageTransition>

      {/* Footer — see DESIGN.md §11.3. Three columns, ink surface, no decoration. */}
      <footer className="bg-ink text-bone">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Brand block */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <StatsSpeakLogo width={28} height={38} />
                <span className="text-h4 font-sans text-bone">StatsSpeak</span>
              </div>
              <p className="text-body text-ink-300 max-w-md">
                A data consultancy and software development practice serving ministries, NGOs, and growth-stage enterprises across East Africa.
              </p>

              <ul className="mt-10 space-y-4 text-caption text-ink-300">
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <a href="mailto:info@statsspeak.co.ke" className="hover:text-bone transition-colors">
                    info@statsspeak.co.ke
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <a href="tel:+254715644881" className="hover:text-bone transition-colors">
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
                {[
                  { id: "services", label: "Services" },
                  { id: "case-studies", label: "Work" },
                  { id: "about", label: "About" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentPage(item.id)}
                      className="text-body text-bone hover:text-ink-300 transition-colors"
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
                <li>Data Consultancy</li>
                <li>Data Engineering & Platforms</li>
                <li>Analytics, ML & AI</li>
                <li>Geospatial Intelligence</li>
                <li>Software Development</li>
              </ul>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-ink-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-caption text-ink-300">
              © {year} StatsSpeak Limited. Nairobi, Kenya.
            </p>
            <div className="flex gap-8 text-caption text-ink-300">
              <a href="#" className="hover:text-bone transition-colors">Privacy</a>
              <a href="#" className="hover:text-bone transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <AppContent />
    </ReactLenis>
  );
}

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useLenis(({ progress }) => {
    setScrollProgress(progress * 100);
  });

  return scrollProgress;
};

/**
 * Scroll progress — 1px ink line, no gradient. See DESIGN.md §6.
 */
const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-px z-50 bg-transparent">
      <div
        className="h-full bg-ink"
        style={{ width: `${scrollProgress}%`, transition: "width 100ms linear" }}
      />
    </div>
  );
};

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

/**
 * Page transition — 200ms fade + 8px lift, ease-out. See DESIGN.md §6.4.
 */
const PageTransition = ({ children, pageKey }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 30);
    return () => clearTimeout(timer);
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
};
