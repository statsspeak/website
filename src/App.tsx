import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import StatsSpeakLogo from "./components/logo"; // Make sure this import is added

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={setCurrentPage} />;
      case "services":
        return <ServicesPage onPageChange={setCurrentPage} />;
      case "case-studies":
        return <CaseStudiesPage onPageChange={setCurrentPage} />;
      case "about":
        return <AboutPage onPageChange={setCurrentPage} />;
      case "contact":
        return <ContactPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <PageTransition pageKey={currentPage}>
        <main className="w-full">{renderPage()}</main>
      </PageTransition>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <StatsSpeakLogo width={32} height={43} />
                <h3 className="text-lg font-semibold text-white">StatsSpeak</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Transforming businesses across Kenya and East Africa through
                cutting-edge data science, engineering, and technology
                solutions.
              </p>
              <div className="space-y-2 text-gray-300">
                <p>📧 info@statsspeak.co.ke</p>
                <p>📞 +254 715 644 881</p>
                <p>📍 10th Floor, Mercure, Upperhill, Nairobi</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-primary-blue">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCurrentPage("home")}
                    className="text-gray-300 hover:text-primary-blue transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("services")}
                    className="text-gray-300 hover:text-primary-blue transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("case-studies")}
                    className="text-gray-300 hover:text-primary-blue transition-colors"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("about")}
                    className="text-gray-300 hover:text-primary-blue transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="text-gray-300 hover:text-primary-blue transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4 text-primary-blue">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Data Science & Analytics</li>
                <li>Data Engineering</li>
                <li>Software Development</li>
                <li>Geospatial Engineering</li>
                <li>Consulting</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Statsspeak. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-blue transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-blue transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-blue transition-colors text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ReactLenis root>
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

const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-2 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary-blue-light to-primary-blue-dark"
        style={{
          width: `${scrollProgress}%`,
          transition: "width 100ms linear",
        }}
      />
    </div>
  );
};

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

const PageTransition = ({ children, pageKey }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [pageKey]);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pageKey, lenis]);

  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};
