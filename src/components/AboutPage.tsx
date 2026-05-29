import { ArrowRight } from "lucide-react";
import { PageHero } from "./PageHero";
import { Button } from "./ui/button";
import { LeadershipTeam, type Director } from "./Team";
import type { PageChangeHandler } from "../pages";

import washington from "../assets/team-photos/washington-ogol.jpeg";
import anthony from "../assets/team-photos/Antony.jpeg";
import alloys from "../assets/team-photos/alloys-mila.jpeg";
import joan from "../assets/team-photos/Joan.jpg";
import kelvin from "../assets/team-photos/kelvin-adungosi.jpeg";

interface AboutPageProps {
  onPageChange: PageChangeHandler;
}

const values = [
  {
    title: "Excellence",
    description:
      "Work is judged by whether it can survive scrutiny from operators, auditors, and senior institutional stakeholders.",
  },
  {
    title: "Integrity",
    description:
      "We are direct about uncertainty, constraints, data quality, and the operational trade-offs behind every recommendation.",
  },
  {
    title: "Collaboration",
    description:
      "Client teams are involved early, because systems only last when the people responsible for them can explain and operate them.",
  },
  {
    title: "Innovation",
    description:
      "New tools are useful when they reduce friction or improve judgement. They are never a substitute for institutional context.",
  },
];

const directors: Director[] = [
  {
    name: "Washington Ogol",
    role: "Co-Founder & CEO",
    image: washington,
    bio: "Washington leads the practice with a focus on data strategy, analytics delivery, and long-term client stewardship.",
    specialties: [
      "Data Strategy",
      "Data Governance",
      "Analytics & ML",
      "Data Consultancy",
    ],
  },
  {
    name: "Anthony Ngatia",
    role: "Chief Health Officer",
    image: anthony,
    bio: "Anthony brings public-health and health-data experience to engagements where technical design must match programme reality.",
    specialties: [
      "Global Health Data Science",
      "Public Health Strategy",
      "Health Systems",
    ],
  },
  {
    name: "Alloys Mila",
    role: "Chief Technology Officer",
    image: alloys,
    bio: "Alloys leads product and engineering work, translating data requirements into dependable software and platform architecture.",
    specialties: ["Product Engineering", "Software Development", "Platforms"],
  },
  {
    name: "Joanita Kisembo",
    role: "Head Project Manager",
    image: joan,
    bio: "Joanita oversees project delivery, keeping scope, stakeholder rhythm, and implementation quality aligned across engagements.",
    specialties: ["Project Management", "Business Analysis", "Data Analysis"],
  },
  {
    name: "Kelvin Adungosi",
    role: "Head of Software & Data",
    image: kelvin,
    bio: "Kelvin leads software and data operations, with a focus on enterprise data strategy, DataOps, data products, and applied AI development.",
    specialties: ["Enterprise Data Strategy", "DataOps", "Data Products"],
  },
];

const milestones = [
  {
    title: "Founded in Nairobi",
    description:
      "StatsSpeak was established for organisations operating in East Africa that need data consultancy and software delivery under one roof.",
  },
  {
    title: "Institutional work deepened",
    description:
      "The practice expanded its public-health and enterprise analytics work with named institutional partners.",
  },
  {
    title: "Geospatial capacity expanded",
    description:
      "Location intelligence became a core discipline for planning, coverage, and service-delivery engagements.",
  },
  {
    title: "Software and AI delivery expanded",
    description:
      "Software development, AI-assisted reporting, and workflow automation became part of the delivery model where they improved handover and speed.",
  },
];

export function AboutPage({ onPageChange }: AboutPageProps) {
  return (
    <div className="w-full bg-bone text-ink-800">
      <PageHero
        eyebrow="About"
        title="A Nairobi consultancy for data and software work."
        description="StatsSpeak works with ministries, NGOs, and enterprises that need data strategy, governance, systems, analysis, and software to be clear enough for leadership and durable enough for operations."
      >
        <Button
          size="lg"
          variant="primary"
          onClick={() => onPageChange("contact")}
          className="mt-10"
        >
          Book an introduction
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="py-32 lg:py-40 border-t border-line bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-micro text-ink-500 mb-8">Position</div>
              <p className="text-display-2 text-ink">
                We are a data consultancy and software development partner for
                institutions that need judgement and durable implementation.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 space-y-8">
              <p className="text-body-lg text-ink-500">
                Our clients bring us reporting bottlenecks, fragmented data,
                planning constraints, and institutional decisions that need better
                evidence behind them.
              </p>
              <p className="text-body text-ink-500">
                We bring strategic discipline, technical fluency, analytics
                judgement, and enough local context to know that a clean dashboard
                is only useful when the data beneath it can be trusted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-6">Operating values</div>
              <h2 className="text-h2 text-ink">How the work is held.</h2>
            </div>
          </div>

          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="border-t border-line pt-8">
                <h3 className="text-h3 text-ink">{value.title}</h3>
                <p className="text-body text-ink-500 mt-4 max-w-xl">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LeadershipTeam directors={directors} />

      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-6">Journey</div>
              <h2 className="text-h2 text-ink">The practice, in context.</h2>
            </div>
            <p className="text-body-lg text-ink-500 max-w-xl lg:col-span-6 lg:col-start-7">
              The milestones matter less as marketing copy than as evidence of
              continuity: a local team, a public-sector track record, and growing
              delivery depth.
            </p>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {milestones.map((milestone) => (
              <article
                key={milestone.title}
                className="py-8"
              >
                <h3 className="text-h3 text-ink">{milestone.title}</h3>
                <p className="text-body text-ink-500 mt-2 max-w-3xl">
                  {milestone.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[720px] px-6 lg:px-12 text-center">
          <div className="text-micro text-ink-500 mb-8">Next step</div>
          <h2 className="text-display-2 text-ink">Read the work first.</h2>
          <p className="text-body-lg text-ink-500 mt-8">
            The clearest way to understand the practice is through the problems
            we have already helped solve.
          </p>
          <div className="mt-12 flex flex-col items-center gap-6">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onPageChange("case-studies")}
            >
              Read selected work
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
