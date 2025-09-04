import {
  ArrowRight,
  BarChart3,
  Database,
  Code,
  Map,
  TrendingUp,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import amref from "../assets/case-studies/amref.jpg";
import twiga from "../assets/case-studies/twiga.png";
import clinton from "../assets/case-studies/clinton.jpeg";
import featured from "../assets/case-studies/featured-post.jpg";
import MoH from "../assets/case-studies/MoH (1).png";

interface CaseStudiesPageProps {
  onPageChange: (page: string) => void;
}

export function CaseStudiesPage({ onPageChange }: CaseStudiesPageProps) {
  const caseStudies = [
    {
      id: 1,
      title: "Improving Healthcare Delivery with Geospatial Data",
      client:
        "Democratic Republic of Congo (DRC), Ethiopia, Ghana, Kenya, and Sierra Leone Ministries of Health",
      category: "Public Health",
      icon: BarChart3,
      image: featured,
      description:
        "Through the Exemplar Utilization of GRID3 Data project, CHAI worked with five partner countries to apply geospatial data to improve health service delivery, particularly for underserved communities.",
      challenge:
        "Many low- and middle-income countries lack the quality data needed to identify high-risk groups, disease hotspots, and effectively plan health service delivery, leading to many communities being missed by health programs.",
      solution:
        "Geospatial data, including GRID3, was used to understand the geographic distribution of populations, disease burden, and healthcare resources to inform decision-making processes, such as identifying optimal locations for services and mapping health coverage.",
      results: [
        "In the DRC, identified optimal locations for community care sites to serve remote populations.",
        "In Ethiopia, helped determine optimal locations for additional oxygen plants.",
        "In Ghana, identified potential sites for screening children with sickle cell disease.",
        "In Kenya, mapped operational health catchment areas and identified children missed during vaccinations.",
        "In Sierra Leone, supported the use of microplanning maps to introduce the human papillomavirus (HPV) vaccine.",
      ],
      technologies: ["Geospatial Data", "GRID3", "Digital Health Solutions"],
      duration: "2 years",
      impact: "High",
      link: "/case-studies/improving-healthcare-delivery",
    },
    {
      id: 2,
      title: "E-commerce and Supply Chain Analytics",
      client: "Twiga Foods",
      category: "Data & Technology",
      icon: Database,
      image: twiga,
      description:
        "Provided embedded analytics to support the digital strategy of Twiga Foods and spearheaded the migration and architecture of their data warehouse.",
      challenge:
        "Twiga Foods needed to leverage data for value-added insights to support its digital platforms and required a more secure data warehouse for its operations.",
      solution:
        "The Statsspeak team provided embedded analytics and spearheaded the back-end design and architecture to migrate the data warehouse from a PostgreSQL database to a more secure system.",
      results: [
        "Provided value-added insights through embedded analytics.",
        "Successfully migrated and secured the data warehouse.",
      ],
      technologies: ["PostgreSQL", "Data Warehouse", "Analytics Platforms"],
      duration: "Not specified",
      impact: "High",
      link: "/case-studies/twiga-foods-analytics",
    },
    {
      id: 3,
      title: "Enterprise-wide Data Analytics Platform",
      client: "Amref Health in Africa",
      category: "Public Health",
      icon: Code,
      image: amref,
      description:
        "Supported Amref Health in Africa in developing an enterprise-wide data analytics platform.",
      challenge:
        "The need for a unified platform to analyze health data across the organization",
      solution:
        "Developed a comprehensive enterprise-wide data analytics platform.",
      results: ["Successfully implemented an organization-wide data platform."],
      technologies: [
        "Data Analytics",
        "Enterprise Platform",
        "Health Data Management",
      ],
      duration: "5 months",
      impact: "Medium",
      link: "/case-studies/amref-analytics-platform",
    },
    {
      id: 4,
      title: "Primary Care Networks Deployment Analytics",
      client: "Ministry of Health (MOH) Kenya",
      category: "Public Health",
      icon: Map,
      image: MoH,
      description:
        "Developed a data analytics platform for the Ministry of Health in Kenya that provides real-time visibility into the deployment of Primary Care Networks (PCNs).",
      challenge:
        "The MOH needed real-time performance metrics and visibility into the deployment of PCNs to enable fast and efficient decision-making.",
      solution:
        "Created a system that integrates with four other HMIS (Health Management Information Systems) to provide real-time data stories and performance metrics.",
      results: [
        "Provides visibility into the deployment of Primary Care Networks.",
        "Offers real-time performance metrics and data stories.",
        "Aids in fast and efficient decision-making across the country.",
      ],
      technologies: ["HMIS Integration", "Data Analytics Platform"],
      duration: "Not specified",
      impact: "High",
      link: "/case-studies/moh-kenya-pcns",
    },
    {
      id: 5,
      title: "Vaccine Supply Chain Data for Decision-Making",
      client: "GOK-MOH (Government of Kenya - Ministry of Health)",
      category: "Public Health",
      icon: BarChart3,
      image: clinton,
      description:
        "Supported the Clinton Health Access Initiative in leveraging the Ministry of Health’s vaccine supply chain data to inform data-driven decision-making approaches.",
      challenge:
        "The Ministry of Health needed to better utilize its vaccine supply chain data to make more informed and strategic decisions about vaccine distribution.",
      solution:
        "Statsspeak was tasked with supporting the organization to leverage the vaccine supply chain data effectively.",
      results: [
        "Informed data-driven decision-making approaches for vaccine supply and distribution.",
      ],
      technologies: [
        "Vaccine Supply Chain Data",
        "Data-Driven Decision Making",
      ],
      duration: "3 months",
      impact: "High",
      link: "/case-studies/vaccine-supply-chain",
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const stats = [
    { icon: Award, value: "100+", label: "Projects Delivered" },
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
    { icon: Clock, value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 gradient-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Case{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Studies
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped organizations across Kenya and East
              Africa achieve remarkable results through data-driven solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-vibrant-blue to-vibrant-purple rounded-2xl flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={study.image}
                    alt={study.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getImpactColor(study.impact)}>
                      {study.impact} Impact
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center">
                      <study.icon className="h-6 w-6 text-vibrant-blue" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{study.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {study.duration}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription className="text-vibrant-blue font-medium">
                    {study.client}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {study.description}
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Challenge</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Key Results</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button
                      variant="ghost"
                      className="text-vibrant-blue hover:bg-vibrant-blue/10"
                      onClick={() => onPageChange(study.link)}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results and
            transform your business through data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onPageChange("contact")}
              className="bg-white text-deep-blue hover:bg-gray-100"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onPageChange("services")}
              className="border-blue-300 text-blue-100 hover:bg-blue-50/10"
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
