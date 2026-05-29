import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { StatsspeakHero } from "./StatsspeakHero";
import type { PageChangeHandler } from "../pages";
import amref from "../assets/logos/amref.png";
import digitax from "../assets/logos/digitax.png";
import lipachat from "../assets/logos/lipachat.png";
import lvct from "../assets/logos/lvct.png";
import moh from "../assets/logos/moh.png";
import pezesha from "../assets/logos/pezesha.png";

interface HomePageProps {
  onPageChange: PageChangeHandler;
}

const disciplines = [
  {
    name: "Data Consultancy",
    summary:
      "Strategy, maturity, operating models, indicators, quality frameworks, and governance designed for institutional use.",
  },
  {
    name: "Data Engineering & Platforms",
    summary:
      "Production pipelines, warehouses, integrations, and data platforms built for reliability, audit, and scale.",
  },
  {
    name: "Analytics, ML & AI",
    summary:
      "Decision-grade analytics, dashboards, models, and AI workflows delivered with institutional rigour.",
  },
  {
    name: "Geospatial Intelligence",
    summary:
      "Location intelligence, catchment mapping, microplanning, spatial modelling, and remote sensing.",
  },
  {
    name: "Software Development",
    summary:
      "Custom platforms, APIs, portals, and operational tools that turn data work into durable products.",
  },
];

const partners = [
  { name: "AMREF Health Africa", logo: amref },
  { name: "Ministry of Health, Kenya", logo: moh },
  { name: "LVCT Health",          logo: lvct },
  { name: "Pezesha",              logo: pezesha },
  { name: "Lipachat",             logo: lipachat },
  { name: "Digitax",              logo: digitax },
];

const approach = [
  {
    title: "Institutional fluency",
    body: "We work directly with ministries, NGOs and regulated enterprises. Our deliverables are written to survive procurement and audit, not just demo day.",
  },
  {
    title: "Evidence over assertion",
    body: "Every recommendation is grounded in a documented baseline, a measured intervention, and a result we can defend.",
  },
  {
    title: "Local, then regional",
    body: "Headquartered in Nairobi. We operate where our clients operate — Kenya, the wider East African Community, and the institutions that span them.",
  },
  {
    title: "Built for handover",
    body: "Data assets, documentation and runbooks designed for your team to own. We work ourselves out of the dependency, not into it.",
  },
];

export function HomePage({ onPageChange }: HomePageProps) {
  return (
    <div className="w-full bg-bone text-ink-800">
      <StatsspeakHero
        onScheduleConsultation={() => onPageChange("contact")}
        onExploreSolutions={() => onPageChange("case-studies")}
      />

      {/* ---------- Institutional clients (logo wall) ---------- */}
      <section className="py-24 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="text-micro text-ink-500 mb-12">Institutional clients</div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-10 items-center">
            {partners.map((p) => (
              <li key={p.name} className="flex items-center justify-center">
                <ImageWithFallback
                  src={p.logo}
                  alt={p.name}
                  className="h-8 w-auto max-w-[140px] object-contain"
                  style={{ filter: "grayscale(1) brightness(0.6)", opacity: 0.85 }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Disciplines ---------- */}
      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-6">Practice</div>
              <h2 className="text-h2 text-ink">The full data lifecycle, one team.</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-body-lg text-ink-500 max-w-xl">
                Most engagements span more than one part of the lifecycle. We
                assemble the team to fit the problem — not the other way round.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {disciplines.map((d) => (
              <article
                key={d.name}
                className="bg-bone p-10 lg:p-14 flex flex-col gap-6 transition-colors duration-200 hover:bg-paper"
              >
                <h3 className="text-h2 text-ink">{d.name}</h3>
                <p className="text-body text-ink-500 max-w-md">{d.summary}</p>
                <button
                  onClick={() => onPageChange("services")}
                  className="link-action self-start text-caption mt-2"
                >
                  See related work →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Proof statement ---------- */}
      <section className="py-32 lg:py-40 border-t border-line bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <div className="text-micro text-ink-500 mb-8">Track record</div>
              <p className="text-display-2 text-ink leading-[1.05]">
                Institutional clients include AMREF Health Africa, the Kenya
                Ministry of Health, LVCT Health, and Pezesha.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 divide-y divide-line border-y border-line">
              <div className="py-6">
                <div className="text-h3 text-ink">Nairobi-founded consultancy</div>
                <div className="text-caption text-ink-500 mt-2">
                  Built for East African institutions that need judgement, not
                  just dashboards.
                </div>
              </div>
              <div className="py-6">
                <div className="text-h3 text-ink">Lifecycle coverage</div>
                <div className="text-caption text-ink-500 mt-2">
                  Lifecycle disciplines: strategy, governance, platforms,
                  analytics, geospatial insight, AI, software, and data products.
                </div>
              </div>
              <div className="py-6">
                <div className="text-h3 text-ink">Institutional delivery</div>
                <div className="text-caption text-ink-500 mt-2">
                  GRID3-informed health-service planning, Ministry of Health
                  analytics, and enterprise platform work.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-6">Approach</div>
              <h2 className="text-h2 text-ink">How we work.</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 max-w-5xl">
            {approach.map((a) => (
              <article key={a.title} className="flex flex-col gap-4">
                <h3 className="text-h3 text-ink">{a.title}</h3>
                <p className="text-body text-ink-500">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Quiet CTA ---------- */}
      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="max-w-2xl">
            <div className="text-micro text-ink-500 mb-8">Engagements</div>
            <p className="text-display-2 text-ink">
              We take on a small number of engagements each year.
            </p>
            <p className="text-body-lg text-ink-500 mt-8 max-w-xl">
              If your organisation is weighing a data, analytics, geospatial, AI,
              or software initiative, an introductory conversation costs nothing
              and will give you a clearer view of what we can and cannot help with.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12">
              <Button size="lg" variant="primary" onClick={() => onPageChange("contact")}>
                Book an introduction
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                onClick={() => onPageChange("about")}
                className="link-action text-body"
              >
                Read our approach →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
