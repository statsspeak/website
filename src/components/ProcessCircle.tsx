import { useState, useEffect, useRef } from "react";

const processSteps = [
  {
    step: "01",
    title: "Discovery & Analysis",
    description:
      "We start by understanding your business goals, current challenges, and data landscape.",
  },
  {
    step: "02",
    title: "Strategy & Planning",
    description:
      "Develop a comprehensive roadmap with clear timelines, milestones, and success metrics.",
  },
  {
    step: "03",
    title: "Development & Implementation",
    description:
      "Build and deploy solutions using industry best practices and cutting-edge technologies.",
  },
  {
    step: "04",
    title: "Testing & Optimization",
    description:
      "Rigorous testing and performance optimization to ensure reliability and efficiency.",
  },
  {
    step: "05",
    title: "Deployment & Support",
    description:
      "Smooth deployment with ongoing support and maintenance to ensure continued success.",
  },
];

const ProcessCircle = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentArrow, setCurrentArrow] = useState(0);
  const [arrowProgress, setArrowProgress] = useState(0);
  const [completedArrows, setCompletedArrows] = useState<number[]>([]);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const sectionRef = useRef(null);
  const animationRef = useRef<number>(null);

  // Responsive radius calculation
  const getStepPosition = (index: number, total: number) => {
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 120;
    const center = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 200;
    const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius + center,
      y: Math.sin(angle) * radius + center,
    };
  };

  // Generate curved path between two points
  const generateCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    curvature = 0.3
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;

    // Calculate perpendicular offset for curve
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Perpendicular vector
    const perpX = -dy / length;
    const perpY = dx / length;

    // Control point for curve
    const controlX = midX + perpX * length * curvature;
    const controlY = midY + perpY * length * curvature;

    return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
  };

  // Auto-play animation function
  const updateAnimation = (progress: number) => {
    const totalArrows = processSteps.length - 1;
    const progressPerArrow = 1 / totalArrows;

    // Determine which arrow should be animating
    const currentArrowIndex = Math.min(
      Math.floor(progress / progressPerArrow),
      totalArrows - 1
    );
    const arrowProgressValue = (progress % progressPerArrow) / progressPerArrow;

    setCurrentArrow(currentArrowIndex);
    setArrowProgress(arrowProgressValue);
    setActiveStep(
      Math.min(
        currentArrowIndex + Math.floor(arrowProgressValue),
        processSteps.length - 1
      )
    );

    // Mark arrows as completed
    const completed = [];
    for (let i = 0; i < currentArrowIndex; i++) {
      completed.push(i);
    }
    if (arrowProgressValue >= 1 && currentArrowIndex < totalArrows - 1) {
      completed.push(currentArrowIndex);
    }
    setCompletedArrows(completed);

    // If animation is complete
    if (progress >= 1) {
      setActiveStep(processSteps.length - 1);
      setCompletedArrows(Array.from({ length: totalArrows }, (_, i) => i));
      setIsAnimating(false);
    }
  };

  // Start animation
  const startAnimation = () => {
    if (hasAnimated || isAnimating) return;

    setIsAnimating(true);
    setHasAnimated(true);

    const duration = 4000; // 4 seconds total animation
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimationProgress(progress);
      updateAnimation(progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Intersection Observer for auto-play trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            // Start animation when 30% of component is visible
            startAnimation();
          }
        });
      },
      {
        threshold: [0.3], // Trigger when 30% visible
        rootMargin: "0px 0px -100px 0px", // Start a bit before it's fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const currentStepData = processSteps[activeStep];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 md:py-16 lg:py-20 animate-fadeIn"
    >
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto relative">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Our <span className="text-indigo-600">Process</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and
              exceeds client expectations.
            </p>
            {isAnimating && (
              <p className="text-xs sm:text-sm text-indigo-600 font-medium mt-2 md:mt-4">
                Progress: {Math.round(animationProgress * 100)}% • Active Step:{" "}
                {activeStep + 1}
              </p>
            )}
          </div>

          {/* Main Content Area - Stack on mobile, side by side on desktop */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-16 max-w-6xl mx-auto">
            
            {/* SVG Circle Container - Responsive */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[500px] aspect-square flex-shrink-0">
              <svg
                width="100%"
                height="100%"
                className="absolute inset-0"
                viewBox="0 0 300 300"
              >
                {/* Background circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.5"
                />

                {/* Completed arrow paths */}
                {completedArrows.map((arrowIndex) => {
                  const startPos = getStepPosition(arrowIndex, processSteps.length);
                  const endPos = getStepPosition(arrowIndex + 1, processSteps.length);
                  const pathData = generateCurvedPath(startPos, endPos, 0.2);

                  return (
                    <path
                      key={`completed-${arrowIndex}`}
                      d={pathData}
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      opacity="0.6"
                      className="animate-pulse"
                    />
                  );
                })}

                {/* Current animated arrow path */}
                {currentArrow < processSteps.length - 1 && isAnimating && (
                  <g>
                    {(() => {
                      const startPos = getStepPosition(currentArrow, processSteps.length);
                      const endPos = getStepPosition(currentArrow + 1, processSteps.length);
                      const pathData = generateCurvedPath(startPos, endPos, 0.2);

                      return (
                        <>
                          {/* Path trail */}
                          <path
                            d={pathData}
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="3"
                            strokeDasharray="1000"
                            strokeDashoffset={1000 - arrowProgress * 1000}
                            className="transition-all duration-100"
                          />

                          {/* Animated arrow head */}
                          {arrowProgress > 0.1 && (
                            <g>
                              <defs>
                                <marker
                                  id="arrowhead"
                                  markerWidth="10"
                                  markerHeight="7"
                                  refX="9"
                                  refY="3.5"
                                  orient="auto"
                                >
                                  <polygon
                                    points="0 0, 10 3.5, 0 7"
                                    fill="#4f46e5"
                                  />
                                </marker>
                              </defs>

                              <circle
                                cx={
                                  startPos.x + (endPos.x - startPos.x) * arrowProgress
                                }
                                cy={
                                  startPos.y + (endPos.y - startPos.y) * arrowProgress
                                }
                                r="4"
                                fill="#4f46e5"
                                className="drop-shadow-lg"
                              >
                                <animate
                                  attributeName="r"
                                  values="4;6;4"
                                  dur="0.5s"
                                  repeatCount="indefinite"
                                />
                              </circle>
                            </g>
                          )}
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* Arrow shooting effects */}
                {arrowProgress > 0.5 &&
                  currentArrow < processSteps.length - 1 &&
                  isAnimating && (
                    <g>
                      {[...Array(3)].map((_, i) => {
                        const startPos = getStepPosition(currentArrow, processSteps.length);
                        const endPos = getStepPosition(currentArrow + 1, processSteps.length);
                        const progress = Math.max(0, arrowProgress - i * 0.1);

                        return (
                          <circle
                            key={`trail-${i}`}
                            cx={startPos.x + (endPos.x - startPos.x) * progress}
                            cy={startPos.y + (endPos.y - startPos.y) * progress}
                            r={2 - i * 0.5}
                            fill="#6366f1"
                            opacity={0.6 - i * 0.2}
                          />
                        );
                      })}
                    </g>
                  )}
              </svg>

              {/* Process Steps - Circles */}
              {processSteps.map((step, index) => {
                const position = getStepPosition(index, processSteps.length);
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;

                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                    }}
                  >
                    {/* Step Circle - Responsive sizing */}
                    <div
                      className={`
                        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 
                        rounded-full flex items-center justify-center font-bold 
                        text-xs sm:text-sm md:text-base lg:text-lg shadow-xl 
                        transition-all duration-700 transform border-4
                        ${
                          isCurrent
                            ? "bg-indigo-600 text-white scale-125 border-indigo-300 shadow-2xl animate-pulse"
                            : isActive
                            ? "bg-indigo-500 text-white scale-110 border-indigo-400"
                            : "bg-white text-gray-400 scale-100 border-gray-200"
                        }
                      `}
                    >
                      {step.step}
                    </div>
                  </div>
                );
              })}

              {/* Center Progress Indicator - Responsive */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="bg-white rounded-full p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 shadow-2xl border-4 border-indigo-100">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
                    {Math.round(animationProgress * 100)}%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">
                    Progress
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel for Description - Full width on mobile */}
            <div className="flex-1 w-full lg:max-w-md xl:max-w-lg">
              <div className="p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5 md:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg">
                    {currentStepData.step}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Current Step</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-700">
                      {activeStep + 1} of {processSteps.length}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
                    {currentStepData.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                    {currentStepData.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2">
                    <span>Overall Progress</span>
                    <span>
                      {Math.round(((activeStep + 1) / processSteps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${((activeStep + 1) / processSteps.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Step indicators */}
                <div className="flex justify-between">
                  {processSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index <= activeStep ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessCircle;
