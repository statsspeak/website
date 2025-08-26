import { useState, useEffect, useRef } from "react";
import { useLenis } from "@studio-freight/react-lenis";

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    stagger = 0,
    animationType = "fadeUp",
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) setHasTriggered(true);
          }, stagger);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, stagger]);

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out";

    switch (animationType) {
      case "fadeUp":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`;

      case "fadeDown":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
        }`;

      case "fadeLeft":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`;

      case "fadeRight":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        }`;

      case "scaleUp":
        return `${baseClasses} ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`;

      case "slideUpScale":
        return `${baseClasses} ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-98"
        }`;

      case "rotateIn":
        return `${baseClasses} ${
          isVisible ? "opacity-100 rotate-0" : "opacity-0 -rotate-3"
        }`;

      case "flipUp":
        return `${baseClasses} transform-gpu ${
          isVisible ? "opacity-100 rotate-x-0" : "opacity-0 rotate-x-90"
        }`;

      case "elastic":
        return `transition-all duration-1200 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-16 scale-95"
        }`;

      case "magneticRise":
        return `transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        } ${isVisible ? "ease-out" : "ease-in"}`;

      default:
        return `${baseClasses} ${isVisible ? "opacity-100" : "opacity-0"}`;
    }
  };

  return [elementRef, getAnimationClasses(), isVisible];
};

// Staggered children animation hook
export const useStaggeredAnimation = (childrenCount, baseDelay = 100) => {
  const [visibleChildren, setVisibleChildren] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the children animations
          for (let i = 0; i < childrenCount; i++) {
            setTimeout(() => {
              setVisibleChildren((prev) => new Set([...prev, i]));
            }, i * baseDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [childrenCount, baseDelay]);

  return [containerRef, visibleChildren];
};

// Parallax scroll hook
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useLenis(({ scroll }) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const elementTop = rect.top + scroll;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate parallax offset
      const parallaxOffset = (scroll - elementTop + windowHeight) * speed;
      setOffset(parallaxOffset);
    }
  });

  return [elementRef, offset];
};

// Morphing background hook for sections
export const useMorphingBackground = () => {
  const [morphValue, setMorphValue] = useState(0);
  const sectionRef = useRef(null);

  useLenis(({ scroll }) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top + scroll;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate morph value based on scroll position
      const progress = Math.max(
        0,
        Math.min(
          1,
          (scroll - elementTop + windowHeight) / (windowHeight + elementHeight)
        )
      );
      setMorphValue(progress);
    }
  });

  const getMorphStyle = (
    startColor = "rgb(30, 58, 138)",
    endColor = "rgb(99, 102, 241)"
  ) => ({
    background: `linear-gradient(135deg, 
      color-mix(in srgb, ${startColor} ${
      100 - morphValue * 100
    }%, ${endColor} ${morphValue * 100}%), 
      color-mix(in srgb, ${endColor} ${100 - morphValue * 50}%, ${startColor} ${
      morphValue * 50
    }%))`,
    transform: `scale(${1 + morphValue * 0.02})`,
    transition: "transform 0.3s ease-out",
  });

  return [sectionRef, getMorphStyle, morphValue];
};

// Text reveal animation hook
export const useTextReveal = (text = "", speed = 50) => {
  const [revealedText, setRevealedText] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRevealing) {
          setIsRevealing(true);

          // Animate text reveal
          let currentIndex = 0;
          const interval = setInterval(() => {
            if (currentIndex <= text.length) {
              setRevealedText(text.slice(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(interval);
            }
          }, speed);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [text, speed, isRevealing]);

  return [textRef, revealedText];
};

// Demo Component showing all animations
export const ScrollAnimationDemo = () => {
  const [heroRef, heroClasses] = useScrollAnimation({
    animationType: "magneticRise",
    threshold: 0.2,
  });

  const [cardRef1, cardClasses1] = useScrollAnimation({
    animationType: "slideUpScale",
    stagger: 0,
    threshold: 0.1,
  });

  const [cardRef2, cardClasses2] = useScrollAnimation({
    animationType: "slideUpScale",
    stagger: 150,
    threshold: 0.1,
  });

  const [cardRef3, cardClasses3] = useScrollAnimation({
    animationType: "slideUpScale",
    stagger: 300,
    threshold: 0.1,
  });

  const [parallaxRef, parallaxOffset] = useParallax(-0.3);
  const [morphRef, getMorphStyle, morphValue] = useMorphingBackground();
  const [textRef, revealedText] = useTextReveal(
    "Transforming Data Into Insights",
    80
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Morphing Background */}
      <section
        ref={morphRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={getMorphStyle()}
      >
        {/* Parallax Background Element */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div ref={heroRef} className={`text-center z-10 ${heroClasses}`}>
          <h1 className="text-6xl font-bold text-white mb-6">
            <span ref={textRef} className="inline-block min-h-[1.2em]">
              {revealedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professional data science and engineering solutions for modern
            businesses
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div ref={cardRef1} className={cardClasses1}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="h-6 w-6 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Science</h3>
                <p className="text-gray-600">
                  Advanced analytics and machine learning solutions to unlock
                  insights from your data.
                </p>
              </div>
            </div>

            <div ref={cardRef2} className={cardClasses2}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="h-6 w-6 bg-green-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Engineering</h3>
                <p className="text-gray-600">
                  Robust data pipelines and infrastructure for scalable data
                  processing.
                </p>
              </div>
            </div>

            <div ref={cardRef3} className={cardClasses3}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="h-6 w-6 bg-purple-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Consulting</h3>
                <p className="text-gray-600">
                  Strategic guidance to help you make data-driven decisions and
                  digital transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content to Enable Scrolling */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Why Choose Statsspeak?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We combine cutting-edge technology with deep industry expertise to
            deliver solutions that drive real business value. Our team of data
            scientists, engineers, and consultants work closely with you to
            understand your unique challenges and opportunities.
          </p>
        </div>
      </section>
    </div>
  );
};
