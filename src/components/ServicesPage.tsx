import { ArrowRight, CheckCircle } from "lucide-react";
import { PageHero } from "./PageHero";
import { Button } from "./ui/button";
import type { PageChangeHandler } from "../pages";

interface ServicesPageProps {
  onPageChange: PageChangeHandler;
}

const services = [
  {
    title: "Data Consultancy",
    description:
      "Data maturity assessments, operating models, indicators, governance, and quality frameworks for organisations that need dependable data use.",
    features: [
      "Data strategy and maturity diagnostics",
      "Governance models and stewardship workflows",
      "Indicator frameworks and reporting architecture",
      "Data quality standards and documentation",
    ],
    tools: ["Data governance", "Data quality", "M&E", "Metadata", "Runbooks"],
  },
  {
    title: "Data Engineering & Platforms",
    description:
      "Production pipelines, warehouses, integrations, and processing layers for teams that need reliable data under audit.",
    features: [
      "ETL and ELT pipeline development",
      "Warehouse and lakehouse architecture",
      "API, HMIS, and source-system integrations",
      "Cloud, security, and handover documentation",
    ],
    tools: ["Spark", "Airflow", "Kafka", "PostgreSQL", "AWS", "Docker"],
  },
  {
    title: "Analytics, ML & AI",
    description:
      "Decision-grade analytics, dashboards, statistical modelling, and applied AI workflows that make reporting clearer and faster.",
    features: [
      "Predictive modelling and forecasting",
      "Business intelligence dashboards",
      "Natural-language analytics workflows",
      "Experimentation and performance measurement",
    ],
    tools: ["Python", "R", "SQL", "Power BI", "Tableau", "LangGraph"],
  },
  {
    title: "Geospatial Intelligence",
    description:
      "Location intelligence, spatial analysis, and mapping workflows for planning, coverage, resource allocation, and field operations.",
    features: [
      "Catchment, coverage, and microplanning maps",
      "Spatial data modelling and remote sensing",
      "Interactive mapping applications",
      "Location intelligence for service delivery",
    ],
    tools: ["QGIS", "ArcGIS", "PostGIS", "GDAL", "Leaflet", "OpenLayers"],
  },
  {
    title: "Software Development",
    description:
      "Custom platforms, APIs, portals, and operational tools that turn strategy and analysis into durable products owned by your team.",
    features: [
      "Custom web applications and APIs",
      "Internal portals and operational systems",
      "Database design and optimisation",
      "DevOps, CI/CD, and handover runbooks",
    ],
    tools: ["React", "Node.js", "Python", "PostgreSQL", "Kubernetes", "MongoDB"],
  },
];

const engagementModel = [
  {
    title: "Diagnose",
    body: "We begin with the operational question, the reporting obligation, and the systems already in place.",
  },
  {
    title: "Build",
    body: "We design the governance, pipeline, model, dashboard, map, workflow, or platform with documentation in the workstream from day one.",
  },
  {
    title: "Handover",
    body: "We leave runbooks, source control, and working sessions so the client team can operate the system without dependency theatre.",
  },
];

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  return (
    <div className="w-full bg-bone text-ink-800">
      <PageHero
        eyebrow="Services"
        title="Data consultancy and software development."
        description="We help ministries, NGOs, and growth-stage enterprises make data dependable from strategy and collection through governance, platforms, analytics, geospatial insight, AI, software, and handover."
        mobileDescription="Strategy, governance, platforms, analytics, AI, and software — built for institutional use."
      >
        <Button
          size="lg"
          variant="primary"
          onClick={() => onPageChange("case-studies")}
          className="mt-8 md:mt-10"
        >
          See relevant work
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="py-20 md:py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-12 mb-12 md:mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-4 md:mb-6">Disciplines</div>
              <h2 className="text-h2 text-ink">Lifecycle practices, one delivery team.</h2>
            </div>
            <p className="hidden md:block text-body-lg text-ink-500 max-w-xl lg:col-span-6 lg:col-start-7">
              Serious work crosses the boundary between data strategy,
              governance, engineering, analysis, software, product, and field
              reality. Our services are structured around that overlap.
            </p>
          </div>

          <div className="grid gap-px bg-line border border-line md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="bg-bone p-6 md:p-8 lg:p-12">
                <h3 className="text-h3 md:text-h2 text-ink max-w-md">{service.title}</h3>
                <p className="text-body text-ink-500 max-w-xl mt-4 md:mt-6">
                  {service.description}
                </p>

                <div className="mt-8 md:mt-10 border-t border-line pt-6 md:pt-8">
                  <div className="hidden md:block text-micro text-ink-500 mb-5">Typical work</div>
                  <ul className="grid gap-3">
                    {service.features.map((feature, idx) => (
                      <li
                        key={feature}
                        className={[
                          "flex gap-3 text-body text-ink-700",
                          idx >= 2 ? "hidden md:flex" : "",
                        ].join(" ")}
                      >
                        <CheckCircle
                          className="h-4 w-4 mt-1 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:block mt-10 border-t border-line pt-8">
                  <div className="text-micro text-ink-500 mb-5">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-sm border border-line px-2 py-1 text-mono text-ink-500"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="hidden md:inline-block mt-10">
                  <button
                    onClick={() => onPageChange("case-studies")}
                    className="link-action text-body"
                  >
                    See related work →
                  </button>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 border-t border-line bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-micro text-ink-500 mb-6 md:mb-8">Named proof</div>
              <p className="text-display-2 text-ink">
                Kenya Ministry of Health deployment analytics connected HMIS
                sources into real-time PCN visibility.
              </p>
            </div>
            <div className="hidden md:block lg:col-span-6 lg:col-start-7">
              <div className="divide-y divide-line border-y border-line">
                {[
                  "HMIS sources connected for national reporting visibility.",
                  "GRID3-informed geospatial data used for health-service delivery planning.",
                  "Nairobi consultancy serving institutions across data and software work.",
                ].map((proof) => (
                  <div key={proof} className="py-8">
                    <p className="text-body-lg text-ink-500">{proof}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-12 mb-12 md:mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-4 md:mb-6">Engagement model</div>
              <h2 className="text-h2 text-ink">Designed for handover.</h2>
            </div>
          </div>

          <div className="grid gap-8 md:gap-12 md:grid-cols-3">
            {engagementModel.map((step) => (
              <article key={step.title} className="border-t border-line pt-6 md:pt-8">
                <h3 className="text-h4 md:text-h3 text-ink">{step.title}</h3>
                <p className="text-body text-ink-500 mt-3 md:mt-4">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[720px] px-6 lg:px-12 text-center">
          <div className="text-micro text-ink-500 mb-6 md:mb-8">Next step</div>
          <h2 className="text-display-2 text-ink">Start with the evidence.</h2>
          <p className="hidden md:block text-body-lg text-ink-500 mt-8">
            Review the work first. Then we can talk about whether your data,
            analytics, geospatial, AI, or software initiative is a fit.
          </p>
          <div className="mt-8 md:mt-12 flex flex-col items-center gap-5 md:gap-6">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onPageChange("case-studies")}
            >
              See relevant work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <button
              onClick={() => onPageChange("contact")}
              className="link-action text-body"
            >
              Book an introduction →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
