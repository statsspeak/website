import { useState } from "react";
import { ArrowRight, CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "./PageHero";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import type { PageChangeHandler } from "../pages";

interface ContactPageProps {
  onPageChange: PageChangeHandler;
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "info@statsspeak.co.ke",
    link: "mailto:info@statsspeak.co.ke",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+254 715 644 881",
    link: "tel:+254715644881",
  },
  {
    icon: MapPin,
    title: "Office",
    detail: "10th Floor, Mercure, Upperhill, Nairobi",
    link: "https://maps.app.goo.gl/i6kMjyubUxgYWPqa8",
  },
  {
    icon: Clock,
    title: "Hours",
    detail: "Mon - Fri, 9:00 - 18:00 EAT",
    link: null,
  },
];

const faqs = [
  {
    question: "What types of projects do you take on?",
    answer:
      "We work across data consultancy and software development: strategy, governance, data engineering, analytics and ML, geospatial intelligence, AI workflows, and operational products that support institutional decisions.",
  },
  {
    question: "How long does an engagement take?",
    answer:
      "Timelines depend on the data estate and decision cycle. Short diagnostic work can take weeks; platform and integration work often runs for several months.",
  },
  {
    question: "Do you support handover?",
    answer:
      "Yes. Documentation, source control, runbooks, and working sessions are part of the delivery model rather than an afterthought.",
  },
];

export function ContactPage({ onPageChange }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    brief: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      organisation: "",
      brief: "",
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full bg-bone text-ink-800">
      <PageHero
        eyebrow="Contact"
        title="Send the brief. We will be direct."
        description="Tell us what decision, system, or reporting problem is in front of you. We will respond with the clearest next step."
        mobileDescription="Send the brief. We will respond with the clearest next step."
      />

      <section className="py-16 md:py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle>Project brief</CardTitle>
                  <CardDescription>
                    A short brief with enough context for a useful first response.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted && (
                    <div
                      className="mb-10 border border-line bg-bone p-6"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex gap-3 text-ink">
                        <CheckCircle className="h-5 w-5 mt-1" aria-hidden="true" />
                        <div>
                          <h2 className="text-h4 text-ink">Brief received.</h2>
                          <p className="text-body text-ink-500 mt-2">
                            Thank you. We will respond through the work email you
                            provided.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-3">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(event) =>
                            handleInputChange("name", event.target.value)
                          }
                          autoComplete="name"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email">Work email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(event) =>
                            handleInputChange("email", event.target.value)
                          }
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="organisation">Organisation</Label>
                      <Input
                        id="organisation"
                        value={formData.organisation}
                        onChange={(event) =>
                          handleInputChange("organisation", event.target.value)
                        }
                        autoComplete="organization"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="brief">Brief *</Label>
                      <Textarea
                        id="brief"
                        value={formData.brief}
                        onChange={(event) =>
                          handleInputChange("brief", event.target.value)
                        }
                        maxLength={1000}
                        rows={7}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" variant="primary">
                      Send brief
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border-y border-line divide-y divide-line">
                {contactInfo.map((info) => (
                  <div key={info.title} className="py-6">
                    <div className="flex gap-4">
                      <info.icon className="h-5 w-5 mt-1 text-ink" aria-hidden="true" />
                      <div>
                        <div className="text-micro text-ink-500 mb-2">
                          {info.title}
                        </div>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="link-action text-body"
                          >
                            {info.detail}
                          </a>
                        ) : (
                          <p className="text-body text-ink">{info.detail}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block mt-12 border-t border-line pt-8">
                <div className="text-micro text-ink-500 mb-6">Working fit</div>
                <p className="text-body text-ink-500">
                  We are best suited to engagements where the organisation has a
                  real decision to support, a system to improve, or data assets
                  that need to become operationally useful.
                </p>
                <button
                  onClick={() => onPageChange("case-studies")}
                  className="link-action mt-8 text-body"
                >
                  Read selected work →
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 border-t border-line bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-12 mb-12 md:mb-20">
            <div className="lg:col-span-4">
              <div className="text-micro text-ink-500 mb-4 md:mb-6">Questions</div>
              <h2 className="text-h2 text-ink">Before the first call.</h2>
            </div>
          </div>

          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-t border-line pt-6 md:pt-8">
                <h3 className="text-h4 md:text-h3 text-ink">{faq.question}</h3>
                <p className="text-body text-ink-500 mt-3 md:mt-4">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 border-t border-line">
        <div className="mx-auto max-w-[720px] px-6 lg:px-12 text-center">
          <div className="text-micro text-ink-500 mb-6 md:mb-8">Office</div>
          <h2 className="text-display-2 text-ink">Upper Hill, Nairobi.</h2>
          <p className="hidden md:block text-body-lg text-ink-500 mt-8">
            We meet by appointment at 10th Floor, Mercure, Upperhill, Nairobi,
            Monday to Friday.
          </p>
          <div className="mt-6 md:mt-12">
            <a
              href="https://maps.app.goo.gl/i6kMjyubUxgYWPqa8"
              className="link-action text-body"
            >
              Open map
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
