import { useId } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface StatsspeakHeroProps {
  title?: string;
  description?: string;
  onScheduleConsultation: () => void;
  onExploreSolutions: () => void;
}

/**
 * Ethereal shadow — a soft teal cloud generated entirely in SVG.
 * Motion is CSS keyframes (no rAF), two stacked orbits at non-harmonic
 * periods. Linear timing, closed-loop keyframes ⇒ no zero-velocity
 * moments, no abrupt start/stop. Reduced-motion media query disables
 * both orbits — the static cloud is the still version of the moving one.
 * Constraints in DESIGN.md §6.7 (Form C).
 */
function EtherealShadowScene() {
  const rawId = useId();
  const filterId = `ether-filter-${rawId.replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden statsspeak-ether-mask"
      data-testid="ethereal-shadow-scene"
    >
      <div className="absolute inset-0 statsspeak-ether-orbit-slow">
        <div className="absolute inset-0 statsspeak-ether-orbit-fast">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 100 100"
            className="absolute h-[130%] w-[130%]"
            style={{ left: "-15%", top: "-15%" }}
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
                  type="fractalNoise"
                  baseFrequency="0.018 0.028"
                  numOctaves="3"
                  seed="2"
                  stitchTiles="stitch"
                />
                {/*
                  Interpolate noise → colour:
                    noise = 0  →  --marine     (deep teal, valleys)
                    noise = 1  →  --logo-teal  (bright cyan, peaks)
                  Alpha: A = 0.85 * R - 0.20, clamped 0…0.65 — the
                  cloud is present but never dominates type.
                */}
                <feColorMatrix
                  type="matrix"
                  values="
                    -0.024 0 0 0  0.024
                     0.384 0 0 0  0.290
                     0.451 0 0 0  0.333
                     0.85  0 0 0 -0.20
                  "
                />
                <feGaussianBlur stdDeviation="0.8" />
              </filter>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              filter={`url(#${filterId})`}
            />
          </svg>
        </div>
      </div>
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
      className="relative isolate overflow-hidden bg-bone pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div className="absolute inset-0 statsspeak-hero-data-surface" aria-hidden="true" />
      <EtherealShadowScene />
      <div className="absolute inset-0 statsspeak-hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center animate-fade-in-up lg:min-h-[520px]">
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

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center md:mt-12">
            <Button size="lg" variant="primary" onClick={onScheduleConsultation}>
              Book an introduction
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" onClick={onExploreSolutions}>
              Read selected work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { EtherealShadowScene };
