import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import StatsSpeakLogo from "./logo";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

function NavButton({
  label,
  onClick,
  active,
  hasDropdown = false,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
  hasDropdown?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex items-center gap-1 px-4 py-2 text-lg font-medium rounded-full overflow-hidden transition-all duration-200 h-10/12
        ${active ? "text-primary-blue shadow-lg" : "text-gray-300"}
      `}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {!active && (
        <>
          <motion.span
            className="absolute top-0 left-0 h-full bg-gray-800/50"
            variants={{
              rest: { width: 0 },
              hover: {
                width: "50%",
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
          />
          <motion.span
            className="absolute top-0 right-0 h-full bg-gray-800/50"
            variants={{
              rest: { width: 0 },
              hover: {
                width: "50%",
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.05 },
              },
            }}
          />
        </>
      )}

      <motion.span
        className={`relative z-10 ${active ? "text-white" : "text-gray-300"}`}
        variants={{
          rest: { color: "rgb(209 213 219)" },
          hover: { color: "rgb(255 255 255)" },
        }}
      >
        {label}
      </motion.span>

      {hasDropdown && (
        <motion.div
          className="relative z-10"
          variants={{
            rest: { color: "rgb(209 213 219)" },
            hover: { color: "rgb(255 255 255)" },
          }}
        >
          <ChevronDown className="w-3 h-3 ml-1" />
        </motion.div>
      )}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue"
          layoutId="underline"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.button>
  );
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Service" },
    { id: "case-studies", label: "Case Studies" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <motion.nav
      className="fixed top-5 left-0 z-50 w-full h-18 md:h-18"
      initial={{ y: -100 }}
      animate={{ y: showNav ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-5 md:items-center h-full">
          {/* Left: Logo - Takes 1 column */}
          <div className="flex justify-start">
            <motion.button
              onClick={() => onPageChange("home")}
              className="flex items-center space-x-2 backdrop-blur-lg shadow-xl rounded-full p-2"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <div className="flex items-center">
                <StatsSpeakLogo />

                {/* Expanding text */}
                <motion.span
                  className="ml-2 text-blue-400 text-lg font-semibold whitespace-nowrap overflow-hidden"
                  variants={{
                    rest: { width: 0, opacity: 0 },
                    hover: {
                      width: "auto",
                      opacity: 1,
                      transition: { duration: 0.4, ease: "easeInOut" },
                    },
                  }}
                >
                  statsspeak
                </motion.span>
              </div>
            </motion.button>
          </div>

          {/* Center: Navigation Menu - Takes 3 columns (col-span-3) */}
          <div className="col-span-3 flex justify-center items-center align-middle h-full">
            <div className="flex justify-evenly items-center align-middle space-x-2 bg-slate-900/80 rounded-full px-4 py-1 backdrop-blur-sm shadow-xl h-3/4 w-11/12 m-auto">
              {menuItems.map((item) => (
                <NavButton
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  label={item.label}
                  active={currentPage === item.id}
                />
              ))}
            </div>
          </div>

          {/* Right: CTA Button - Takes 1 column */}
          <div className="flex justify-end h-3/4">
            <button
              onClick={() => onPageChange("contact")}
              className="flex items-center gap-2 px-6 py-3 bg-primary-blue hover:bg-primary-blue-dark text-white text-lg font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between h-full">
          {/* Logo */}
          <motion.button
            onClick={() => onPageChange("home")}
            className="flex items-center space-x-2 backdrop-blur-lg shadow-xl rounded-full p-2"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <div className="flex items-center">
              {/* Use the actual StatsSpeakLogo instead of the "S" circle */}
              <StatsSpeakLogo width={32} height={43} />
              
              {/* Expanding text */}
              <motion.span
                className="ml-2 text-blue-400 text-lg font-semibold whitespace-nowrap overflow-hidden"
                variants={{
                  rest: { width: 0, opacity: 0 },
                  hover: {
                    width: "auto",
                    opacity: 1,
                    transition: { duration: 0.4, ease: "easeInOut" },
                  },
                }}
              >
                statsspeak
              </motion.span>
            </div>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`
                      flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium
                      ${
                        currentPage === item.id
                          ? "text-white bg-primary-blue"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }
                    `}
                >
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-slate-800/50 mt-2">
                <button
                  onClick={() => {
                    onPageChange("contact");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary-blue hover:bg-primary-blue-dark text-white text-sm font-medium rounded-full transition-all duration-200"
                >
                  Get Started Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
