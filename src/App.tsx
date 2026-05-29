import { useState, type ReactElement } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { Footer } from "./components/Footer";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { PageTransition } from "./components/PageTransition";

import type { Page, PageChangeHandler } from "./pages";

/**
 * Tiny router. Each page is a function of `setCurrentPage`, so navigation
 * stays a single `useState` and there's no routing library to maintain.
 */
function renderPage(page: Page, onPageChange: PageChangeHandler): ReactElement {
  switch (page) {
    case "home":         return <HomePage onPageChange={onPageChange} />;
    case "services":     return <ServicesPage onPageChange={onPageChange} />;
    case "case-studies": return <CaseStudiesPage onPageChange={onPageChange} />;
    case "about":        return <AboutPage onPageChange={onPageChange} />;
    case "contact":      return <ContactPage onPageChange={onPageChange} />;
  }
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  return (
    <div className="min-h-screen bg-bone text-ink-800 pb-[calc(env(safe-area-inset-bottom)+56px)] md:pb-0">
      <ScrollProgressBar />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <PageTransition pageKey={currentPage}>
        <main className="w-full">{renderPage(currentPage, setCurrentPage)}</main>
      </PageTransition>
      <Footer onPageChange={setCurrentPage} />
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
