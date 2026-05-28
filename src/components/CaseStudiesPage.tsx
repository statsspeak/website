import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import amref from "../assets/case-studies/amref.jpg";
import twiga from "../assets/case-studies/twiga.png";
import clinton from "../assets/case-studies/clinton.jpeg";
import featured from "../assets/case-studies/featured-post.jpg";
import MoH from "../assets/case-studies/MoH (1).png";

interface CaseStudiesPageProps {
  onPageChange: (page: string) => void;
}

const caseStudies = [
  {
    title: "Improving healthcare delivery with geospatial data",
    client:
      "Ministries of Health in DRC, Ethiopia, Ghana, Kenya, and Sierra Leone",
    category: "Public health",
    image: featured,
    caption:
      "GRID3-informed planning work used for health-service coverage and microplanning.",
    duration: "Programme engagement",
    description:
      "Through the Exemplar Utilization of GRID3 Data project, partner countries applied geospatial data to improve health service delivery for underserved communities.",
    challenge:
      "Health teams needed stronger data to identify high-risk groups, disease hotspots, service gaps, and communities missed by existing programmes.",
    solution:
      "Geospatial data was used to understand population distribution, disease burden, and healthcare resources, then translate those findings into planning decisions.",
    results: [
      "DRC: identified potential community-care sites for remote populations.",
      "Ethiopia: informed optimal locations for additional oxygen plants.",
      "Kenya: mapped catchment areas and children missed during vaccinations.",
      "Sierra Leone: supported HPV vaccine microplanning maps.",
    ],
    tools: ["Geospatial data", "GRID3", "Digital health"],
  },
  {
    title: "Primary Care Networks deployment analytics",
    client: "Ministry of Health, Kenya",
    category: "Public health",
    image: MoH,
    caption:
      "Deployment analytics for Primary Care Networks across Ministry of Health systems.",
    duration: "National platform",
    description:
      "Developed a data analytics platform giving the Ministry of Health real-time visibility into the deployment of Primary Care Networks.",
    challenge:
      "The Ministry needed performance metrics and visibility across PCN rollout to support fast, efficient national decision-making.",
    solution:
      "The platform integrated HMIS sources and turned operational data into real-time reporting views for national stakeholders.",
    results: [
      "Integrated data from HMIS systems.",
      "Improved visibility into PCN deployment across the country.",
      "Presented real-time performance metrics and data stories.",
    ],
    tools: ["HMIS integration", "Analytics platform", "Public-sector reporting"],
  },
  {
    title: "Enterprise-wide data analytics platform",
    client: "Amref Health Africa",
    category: "Public health",
    image: amref,
    caption:
      "Enterprise analytics work supporting Amref Health Africa reporting and data use.",
    duration: "Enterprise platform",
    description:
      "Supported Amref Health Africa in developing an enterprise-wide data analytics platform.",
    challenge:
      "The organisation needed a unified platform to analyse health data across programmes and teams.",
    solution:
      "Designed and implemented a consolidated analytics platform for organisation-wide reporting.",
    results: ["Implemented an organisation-wide data platform."],
    tools: ["Data analytics", "Enterprise platform", "Health data management"],
  },
  {
    title: "E-commerce and supply-chain analytics",
    client: "Twiga Foods",
    category: "Data & technology",
    image: twiga,
    caption:
      "Embedded analytics and warehouse architecture support for Twiga Foods.",
    duration: "Architecture engagement",
    description:
      "Provided embedded analytics for Twiga Foods and supported the migration and architecture of its data warehouse.",
    challenge:
      "The team needed stronger analytics for digital operations and a more secure data warehouse foundation.",
    solution:
      "StatsSpeak provided embedded analytics and back-end architecture for migration from a PostgreSQL database into a more secure data environment.",
    results: [
      "Provided value-added insights through embedded analytics.",
      "Supported migration and security improvements for the warehouse.",
    ],
    tools: ["PostgreSQL", "Data warehouse", "Embedded analytics"],
  },
  {
    title: "Vaccine supply-chain data for decision-making",
    client: "Clinton Health Access Initiative and GOK-MOH",
    category: "Public health",
    image: clinton,
    caption:
      "Vaccine supply-chain data support for Ministry of Health decision-making.",
    duration: "Supply-chain support",
    description:
      "Supported CHAI in leveraging Ministry of Health vaccine supply-chain data for data-driven decision-making.",
    challenge:
      "The Ministry needed to use vaccine supply-chain data more effectively for distribution decisions.",
    solution:
      "StatsSpeak helped translate supply-chain data into decision-support workflows for vaccine planning.",
    results: [
      "Supported data-driven approaches for vaccine supply and distribution.",
    ],
    tools: ["Supply-chain data", "Decision support", "Public health"],
  },
];

const proofs = [
  "Ministries of Health supported through GRID3-informed health-service planning.",
  "HMIS sources integrated for Kenya Ministry of Health PCN deployment analytics.",
  "Vaccine supply-chain data used for CHAI and GOK-MOH decision support.",
];

export function CaseStudiesPage({ onPageChange }: CaseStudiesPageProps) {
  return (
    <div className="w-full bg-bone text-ink-800">
      <section className="pt-40 lg:pt-56 pb-32 lg:pb-40">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="text-micro text-ink-500 mb-8">Selected work</div>
              <h1 className="text-display-1 text-ink">
                Evidence before assertion.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:self-end">
              <p className="text-body-lg text-ink-500 max-w-md">
                A selection of strategy, governance, engineering, analytics, and
                geospatial work, plus software delivery for public-health
                institutions and regional enterprises.
              </p>
              <Button
                size="lg"
                variant="primary"
                onClick={() => onPageChange("contact")}
                className="mt-10"
              >
                Book an introduction
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-t border-line bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="divide-y divide-line border-y border-line">
            {proofs.map((proof) => (
              <div key={proof} className="py-8">
                <p className="text-body-lg text-ink-500 max-w-3xl">
                  {proof}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-6">Case notes</div>
              <h2 className="text-h2 text-ink">Named clients, named problems.</h2>
            </div>
            <p className="text-body-lg text-ink-500 max-w-xl lg:col-span-6 lg:col-start-7">
              The work below is intentionally concrete: institution, problem,
              method, and result. No star ratings, no anonymous claims.
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.map((study) => (
              <article
                key={study.title}
                className="grid gap-10 border-t border-line pt-12 lg:grid-cols-12"
              >
                <div className="lg:col-span-5">
                  <figure>
                    <ImageWithFallback
                      src={study.image}
                      alt={study.title}
                      className="aspect-[4/3] w-full rounded-lg object-cover"
                      style={{ filter: "saturate(0.7) contrast(1.05)" }}
                    />
                    <figcaption className="mt-4 border-t border-line pt-3 text-caption text-ink-500">
                      {study.caption}
                    </figcaption>
                  </figure>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-micro text-ink-500">
                    <span>{study.category}</span>
                    <span>{study.duration}</span>
                  </div>
                  <h3 className="text-h2 text-ink mt-6">{study.title}</h3>
                  <p className="text-body-lg text-ink mt-4">{study.client}</p>
                  <p className="text-body text-ink-500 mt-6 max-w-2xl">
                    {study.description}
                  </p>

                  <div className="mt-10 grid gap-8 md:grid-cols-2">
                    <div>
                      <div className="text-micro text-ink-500 mb-3">Challenge</div>
                      <p className="text-body text-ink-500">{study.challenge}</p>
                    </div>
                    <div>
                      <div className="text-micro text-ink-500 mb-3">Response</div>
                      <p className="text-body text-ink-500">{study.solution}</p>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-line pt-8">
                    <div className="text-micro text-ink-500 mb-4">Evidence</div>
                    <ul className="grid gap-3">
                      {study.results.map((result) => (
                        <li key={result} className="text-body text-ink-500">
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-sm border border-line px-2 py-1 text-mono text-ink-500"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onPageChange("contact")}
                    className="mt-10 text-body font-medium text-marine underline underline-offset-8 decoration-1 hover:decoration-2 transition-colors"
                  >
                    Request a case note →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[720px] px-6 lg:px-12 text-center">
          <div className="text-micro text-ink-500 mb-8">Engagements</div>
          <h2 className="text-display-2 text-ink">
            Bring us the problem, not the pitch deck.
          </h2>
          <p className="text-body-lg text-ink-500 mt-8">
            We will tell you plainly whether data consultancy, software
            development, analytics, or geospatial work is the right instrument.
          </p>
          <div className="mt-12">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onPageChange("contact")}
            >
              Book an introduction
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
