import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <PageTransition pageKey={currentPage}>
        <main className="w-full">{renderPage()}</main>
      </PageTransition>
      <footer className="bg-charcoal text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... (Your footer content) */}
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
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary-blue to-blue-600"
        style={{
          width: `${scrollProgress}%`,
          transition: "width 100ms linear",
        }}
      />
    </div>
  );
};

const PageTransition = ({ children, pageKey }) => {
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
