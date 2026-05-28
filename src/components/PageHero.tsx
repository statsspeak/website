import type { ReactNode } from "react";
import { Component as EtheralShadow } from "./ui/etheral-shadow";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-bone pt-40 pb-32 lg:pt-56 lg:pb-40">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <EtheralShadow
          color="rgba(0, 172, 200, 0.42)"
          animation={{ scale: 72, speed: 58 }}
          noise={{ opacity: 0.12, scale: 1.15 }}
          sizing="fill"
          showContent={false}
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
      <div className="absolute inset-0 statsspeak-page-hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="text-micro text-ink-500 mb-8">{eyebrow}</div>
            <h1 className="text-display-1 text-ink">{title}</h1>
          </div>
          <div className="lg:col-span-4 lg:self-end">
            <p className="max-w-md text-body-lg text-ink-500">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
