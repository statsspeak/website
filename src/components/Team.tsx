import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LeadershipCarousel = ({
  directors,
}: {
  directors: {
    name: string;
    role: string;
    image: string;
    bio: string;
    specialties: string[];
    linkedin: string;
  }[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % directors.length);
  }, [directors.length]);

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + directors.length) % directors.length
    );
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            Leadership <span className="text-primary-blue">Team</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto px-2">
            Meet the visionary leaders driving Statsspeak's mission to transform
            Africa through data intelligence.
          </p>
        </div>

        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative h-auto min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]">
            {directors.map((director, index) => {
              const offset = index - activeIndex;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <div
                  key={director.name}
                  className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out flex items-center justify-center"
                  style={{
                    transform: `translateX(${offset * 100}%)`,
                    opacity: index === activeIndex ? 1 : 0,
                    visibility: isVisible ? "visible" : "hidden",
                  }}
                  onClick={() => index !== activeIndex && goToIndex(index)}
                >
                  <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 px-2 sm:px-4">
                    {/* Image */}
                    <div className="flex-shrink-0 w-full lg:w-1/2 max-w-md mx-auto lg:max-w-none">
                      <img
                        src={director.image}
                        alt={director.name}
                        className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[450px] object-cover rounded-lg sm:rounded-xl shadow-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 lg:space-y-8">
                      <div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
                          {director.name}
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-primary-blue font-semibold mt-2">
                          {director.role}
                        </p>
                      </div>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
                        {director.bio}
                      </p>
                      <div>
                        <h4 className="font-semibold text-primary-blue text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">
                          Specialties:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {director.specialties.map(
                            (specialty, specialtyIndex) => (
                              <span
                                key={specialtyIndex}
                                className="px-3 py-1 sm:px-4 sm:py-2 bg-light-blue text-primary-blue rounded-full text-xs sm:text-sm lg:text-base"
                              >
                                {specialty}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 lg:-left-12 xl:-left-16 bg-white/80 backdrop-blur-sm hover:bg-white text-primary-blue p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition-all z-40"
            aria-label="Previous team member"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 lg:-right-12 xl:-right-16 bg-white/80 backdrop-blur-sm hover:bg-white text-primary-blue p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition-all z-40"
            aria-label="Next team member"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
            {directors.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-4 sm:w-6 bg-primary-blue"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipCarousel;
