import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";

// Import the ReactLenis component
import { ReactLenis } from "@studio-freight/react-lenis";

export default function App() {
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
    // Wrap your entire application in the ReactLenis component
    <ReactLenis root>
      <div className="min-h-screen bg-background">
        {/* Scroll Progress Bar */}
        <ScrollProgressBar />

        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />

        {/* Page Transition Wrapper */}
        <PageTransition pageKey={currentPage}>
          <main className="w-full">{renderPage()}</main>
        </PageTransition>

        {/* Footer with subtle animation */}
        <footer className="bg-charcoal text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* ... (Your footer content remains the same) */}
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}

// Custom hook for scroll progress (optional, still works with Lenis)
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Calculate initial progress

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollProgress;
};

// Scroll Progress Bar Component (optional, still works with Lenis)
const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary-blue to-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// Page Transition Wrapper (You can still use this for page changes)
const PageTransition = ({ children, pageKey }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset animation on page change
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [pageKey]);

  useEffect(() => {
    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageKey]);

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
