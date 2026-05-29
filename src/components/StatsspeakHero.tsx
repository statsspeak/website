import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Component as EtheralShadow } from "./ui/etheral-shadow";

interface StatsspeakHeroProps {
  title?: string;
  description?: string;
  mobileDescription?: string;
  onScheduleConsultation: () => void;
  onExploreSolutions: () => void;
}

function EtherealShadowScene() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-testid="ethereal-shadow-scene"
      // contain + GPU promotion so the constantly-repainting SVG filter
      // doesn't invalidate paint outside this box on every scroll frame.
      style={{ contain: "paint", willChange: "transform", transform: "translateZ(0)" }}
    >
      <EtheralShadow
        color="rgba(0, 172, 200, 0.72)"
        animation={{ scale: 84, speed: 72 }}
        noise={{ opacity: 0.22, scale: 1.1 }}
        sizing="fill"
        showContent={false}
        style={{
          opacity: 0.82,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}

export function StatsspeakHero({
  title = "Data and software institutions can trust.",
  description = "StatsSpeak is a data consultancy and software development practice working with organisations across Africa. We support the path from strategy and governance to platforms, analytics, geospatial insight, AI workflows, custom software, and operational handover.",
  mobileDescription = "Data consultancy and software development for institutions across Africa.",
  onScheduleConsultation,
  onExploreSolutions,
}: StatsspeakHeroProps) {
  return (
    <section
      aria-labelledby="statsspeak-hero-title"
      className="relative isolate overflow-hidden bg-bone pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28"
    >
      <div className="absolute inset-0 statsspeak-hero-data-surface" aria-hidden="true" />
      <EtherealShadowScene />
      <div className="absolute inset-0 statsspeak-hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex min-h-[360px] flex-col items-center justify-center text-center animate-fade-in-up md:min-h-[420px] lg:min-h-[520px]">
          <div className="text-micro text-ink-500 mb-6 md:mb-10">
            <span className="md:hidden">Data · Software</span>
            <span className="hidden md:inline">Data infrastructure · Software Development</span>
          </div>
          <h1
            id="statsspeak-hero-title"
            className="text-display-1 text-ink"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:mt-10 md:text-lg">
            <span className="md:hidden">{mobileDescription}</span>
            <span className="hidden md:inline">{description}</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:mt-12 md:gap-4">
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
