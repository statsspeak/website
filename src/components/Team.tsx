import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LeadershipCarousel = ({ directors }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % directors.length);
  }, [directors.length]);

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + directors.length) % directors.length
    );
  };

  const goToIndex = (index) => {
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
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="py-16 xl:py-20 2xl:py-24 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="text-center mb-12 xl:mb-16">
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6">
            Leadership <span className="text-primary-blue">Team</span>
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Meet the visionary leaders driving Statsspeak's mission to transform
            Africa through data intelligence.
          </p>
        </div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative h-[40rem] xl:h-[45rem] 2xl:h-[50rem]">
            {directors.map((director, index) => {
              const offset = index - activeIndex;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <div
                  key={director.name}
                  className="absolute w-full h-full transition-all duration-500 ease-in-out flex items-center justify-center"
                  style={{
                    transform: `translateX(${offset * 100}%)`,
                    opacity: index === activeIndex ? 1 : 0,
                    visibility: isVisible ? "visible" : "hidden",
                  }}
                  onClick={() => index !== activeIndex && goToIndex(index)}
                >
                  <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
                    {/* Image */}
                    <div className="flex-shrink-0 w-full md:w-1/2">
                      <img
                        src={director.image}
                        alt={director.name}
                        className="w-full h-96 xl:h-[28rem] object-cover rounded-xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                      <div>
                        <h3 className="text-3xl xl:text-4xl font-bold text-gray-900">
                          {director.name}
                        </h3>
                        <p className="text-xl xl:text-2xl text-primary-blue font-semibold">
                          {director.role}
                        </p>
                      </div>
                      <p className="text-lg xl:text-xl leading-relaxed text-muted-foreground">
                        {director.bio}
                      </p>
                      <div>
                        <h4 className="font-semibold text-primary-blue text-lg xl:text-xl mb-3">
                          Specialties:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {director.specialties.map(
                            (specialty, specialtyIndex) => (
                              <span
                                key={specialtyIndex}
                                className="px-4 py-2 bg-light-blue text-primary-blue rounded-full text-sm xl:text-base"
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
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 2xl:-left-20 bg-white/70 backdrop-blur-sm hover:bg-white text-primary-blue p-3 rounded-full shadow-md hover:shadow-lg transition-all z-40"
            aria-label="Previous team member"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 2xl:-right-20 bg-white/70 backdrop-blur-sm hover:bg-white text-primary-blue p-3 rounded-full shadow-md hover:shadow-lg transition-all z-40"
            aria-label="Next team member"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {directors.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-6 bg-primary-blue"
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
