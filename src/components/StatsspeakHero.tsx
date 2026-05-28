import { useEffect, useId, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface StatsspeakHeroProps {
  title?: string;
  description?: string;
  onScheduleConsultation: () => void;
  onExploreSolutions: () => void;
}

/**
 * Ethereal shadow — a soft ink cloud generated entirely in SVG
 * (feTurbulence → feColorMatrix → feGaussianBlur). No external assets,
 * no framer-motion, no WebGL. The cloud breathes via a slow
 * baseFrequency drift; reduced-motion freezes it. Constraints in
 * DESIGN.md §6.7 (Form C).
 */
function EtherealShadowScene() {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const rawId = useId();
  const filterId = `ether-filter-${rawId.replace(/:/g, "")}`;
  const maskId = `ether-mask-${rawId.replace(/:/g, "")}`;
  const fadeId = `ether-fade-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    const turbulence = turbulenceRef.current;
    if (!turbulence) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefersReducedMotion.matches) return undefined;

    let frameId = 0;
    const startedAt = performance.now();

    const tick = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      // ~40-second breath cycle. Big features (low frequency) drift
      // slowly; the cloud morphs without ever snapping.
      const fx = 0.0085 + Math.sin(elapsed * 0.16) * 0.0022;
      const fy = 0.014 + Math.cos(elapsed * 0.11) * 0.0028;
      turbulence.setAttribute("baseFrequency", `${fx} ${fy}`);
      frameId = window.requestAnimationFrame(tick);
    };
    tick();

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      data-testid="ethereal-shadow-scene"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <filter
            id={filterId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.0085 0.014"
              numOctaves="3"
              seed="2"
              stitchTiles="stitch"
            />
            {/*
              The matrix collapses noise → ink at variable alpha.
              RGB rows output --ink (0.04 0.04 0.05).
              Alpha row keys off the noise red channel:
                A = 0.85 * R - 0.18  ⇒  clamped 0…0.67
            */}
            <feColorMatrix
              type="matrix"
              values="
                0    0 0 0 0.04
                0    0 0 0 0.04
                0    0 0 0 0.05
                0.85 0 0 0 -0.18
              "
            />
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Right-weighted fade so the cloud lives in the right column. */}
          <linearGradient id={fadeId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="38%" stopColor="white" stopOpacity="0.18" />
            <stop offset="72%" stopColor="white" stopOpacity="0.72" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>

          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill={`url(#${fadeId})`} />
          </mask>
        </defs>

        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          filter={`url(#${filterId})`}
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
}

export function StatsspeakHero({
  title = "Data and software institutions can trust.",
  description = "StatsSpeak is a data consultancy and software development practice working with organisations across Africa. We support the path from strategy and governance to platforms, analytics, geospatial insight, AI workflows, custom software, and operational handover.",
  onScheduleConsultation,
  onExploreSolutions,
}: StatsspeakHeroProps) {
  return (
    <section
      aria-labelledby="statsspeak-hero-title"
      className="relative isolate overflow-hidden bg-bone pt-28 pb-16 sm:pb-20 lg:pt-32 lg:pb-20"
    >
      <div className="absolute inset-0 statsspeak-hero-data-surface" aria-hidden="true" />
      <EtherealShadowScene />
      <div className="absolute inset-0 statsspeak-hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid min-h-[420px] items-center gap-12 lg:min-h-[480px] lg:grid-cols-12 lg:gap-16">
          <div className="max-w-4xl animate-fade-in-up lg:col-span-8">
            <div className="text-micro text-ink-500 mb-8 md:mb-10">
              Data consultancy · Software
            </div>
            <h1
              id="statsspeak-hero-title"
              className="text-display-1 text-ink"
            >
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-500 md:mt-10 md:text-lg">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-11">
              <Button size="lg" variant="primary" onClick={onScheduleConsultation}>
                Book an introduction
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="secondary" onClick={onExploreSolutions}>
                Read selected work
              </Button>
            </div>
          </div>

          <div className="hidden lg:col-span-4 lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export { EtherealShadowScene };
