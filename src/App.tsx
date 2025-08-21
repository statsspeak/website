import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="w-full">{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary-blue flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">Statsspeak</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Transforming businesses across Kenya and East Africa through
                cutting-edge data science, engineering, and technology
                solutions.
              </p>
              <div className="space-y-2 text-gray-300">
                <p>📧 hello@statsspeak.co.ke</p>
                <p>📞 +254 700 123 456</p>
                <p>📍 Nairobi, Kenya</p>
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
