import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

function ShutterButton({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  active: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-3 py-2 overflow-hidden rounded-2xl h-full"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Left shutter */}
      <motion.span
        className="absolute top-0 left-0 h-full bg-blue-200/50"
        variants={{
          rest: { width: 0 },
          hover: {
            width: "50%",
            transition: { duration: 0.4, ease: "easeInOut" },
          },
        }}
      />
      {/* Right shutter */}
      <motion.span
        className="absolute top-0 right-0 h-full bg-blue-200/50"
        variants={{
          rest: { width: 0 },
          hover: {
            width: "50%",
            transition: { duration: 0.4, ease: "easeInOut", delay: 0.05 },
          },
        }}
      />
      {/* Text */}
      <span
        className={`relative z-10 ${
          active ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "case-studies", label: "Case Studies" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:h-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-row h-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onPageChange("home")}
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <div className="h-8 w-8 rounded-lg bg-primary-blue flex items-center justify-center animate-pulse-primary-blue">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="gradient-text">Statsspeak</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <ShutterButton
                onClick={() => onPageChange(item.id)}
                label={item.label}
                active={currentPage === item.id}
              />
            ))}
            <Button
              onClick={() => onPageChange("contact")}
              className="bg-primary-blue hover:bg-primary-blue-dark text-white"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? "text-primary-blue bg-light-blue"
                      : "text-muted-foreground hover:text-primary-blue shutter-effect"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => {
                    onPageChange("contact");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-primary-blue hover:bg-primary-blue-dark text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
