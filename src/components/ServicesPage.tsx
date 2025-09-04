import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ServicesPageProps {
  onPageChange: (page: string) => void;
}

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  const services = [
    {
      title: "Data Science & Analytics",
      description:
        "Transform your raw data into actionable business insights with our comprehensive data science solutions.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      features: [
        "Predictive Analytics & Forecasting",
        "Machine Learning Model Development",
        "Statistical Analysis & Modeling",
        "Business Intelligence Dashboards",
        "Data Visualization & Reporting",
        "A/B Testing & Experimentation",
      ],
      technologies: ["Python", "R", "SQL", "Tableau", "Power BI", "Jupyter"],
      benefits: [
        "Improved decision making",
        "Increased operational efficiency",
        "Better customer insights",
        "Risk reduction",
      ],
    },
    {
      title: "Data Engineering",
      description:
        "Build robust, scalable data infrastructure that powers your organization's analytical capabilities.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      features: [
        "ETL/ELT Pipeline Development",
        "Data Warehouse Design & Implementation",
        "Real-time Data Processing",
        "Cloud Data Architecture",
        "Data Quality & Governance",
        "API Development & Integration",
      ],
      technologies: [
        "Apache Spark",
        "Kafka",
        "Airflow",
        "AWS",
        "Azure",
        "Docker",
      ],
      benefits: [
        "Scalable data infrastructure",
        "Improved data quality",
        "Faster data processing",
        "Cost optimization",
      ],
    },
    {
      title: "Software Development",
      description:
        "Custom software solutions designed to meet your specific business requirements and challenges.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      features: [
        "Web Application Development",
        "Mobile App Development",
        "API Design & Development",
        "System Integration",
        "Database Design & Optimization",
        "DevOps & CI/CD Implementation",
      ],
      technologies: [
        "React",
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Kubernetes",
      ],
      benefits: [
        "Custom solutions",
        "Improved efficiency",
        "Better user experience",
        "Scalable architecture",
      ],
    },
    {
      title: "Geospatial Engineering",
      description:
        "Leverage location intelligence and spatial analysis to solve complex geographical challenges.",
      image:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
      features: [
        "GIS Application Development",
        "Spatial Data Analysis",
        "Location Intelligence Solutions",
        "Remote Sensing & Image Processing",
        "GPS & Survey Data Processing",
        "Interactive Mapping Solutions",
      ],
      technologies: [
        "QGIS",
        "ArcGIS",
        "PostGIS",
        "Leaflet",
        "GDAL",
        "OpenLayers",
      ],
      benefits: [
        "Location-based insights",
        "Optimized routing",
        "Better resource allocation",
        "Enhanced planning",
      ],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description:
        "We start by understanding your business goals, current challenges, and data landscape.",
    },
    {
      step: "02",
      title: "Strategy & Planning",
      description:
        "Develop a comprehensive roadmap with clear timelines, milestones, and success metrics.",
    },
    {
      step: "03",
      title: "Development & Implementation",
      description:
        "Build and deploy solutions using industry best practices and cutting-edge technologies.",
    },
    {
      step: "04",
      title: "Testing & Optimization",
      description:
        "Rigorous testing and performance optimization to ensure reliability and efficiency.",
    },
    {
      step: "05",
      title: "Deployment & Support",
      description:
        "Smooth deployment with ongoing support and maintenance to ensure continued success.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-sky-blue/10 via-light-blue/20 to-sky-blue-light/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="text-sky-blue">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive data solutions designed to unlock insights, drive
              innovation, and accelerate your business growth across Kenya and
              East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="mb-6">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-sky-blue">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-sky-blue-dark">
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-sky-blue mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-sky-blue-dark">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className="bg-light-blue text-sky-blue hover:bg-sky-blue hover:text-white px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-sky-blue-dark">
                      Key Benefits
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-sky-blue mr-3 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-medium-blue rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform"></div>
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="relative rounded-2xl shadow-2xl w-full h-auto group-hover:shadow-3xl transition-shadow"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-light-blue/20 to-sky-blue-light/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our <span className="text-sky-blue">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and
              exceeds client expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-sky-blue rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-sky-blue to-medium-blue"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-sky-blue-dark">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="text-sky-blue">StatsSpeak</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sky-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-blue-dark">
                Fast Delivery
              </h3>
              <p className="text-muted-foreground">
                Agile development process ensuring rapid time-to-market without
                compromising quality.
              </p>
            </Card>

            <Card className="border-0 shadow-lg text-center p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-medium-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-blue-dark">
                Security First
              </h3>
              <p className="text-muted-foreground">
                Enterprise-grade security measures to protect your data and
                maintain compliance.
              </p>
            </Card>

            <Card className="border-0 shadow-lg text-center p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sky-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-blue-dark">
                Expert Team
              </h3>
              <p className="text-muted-foreground">
                Experienced professionals with deep expertise in data science
                and engineering.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-blue to-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-sky-blue-light mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and explore how we can help
            you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onPageChange("contact")}
              className="bg-white text-sky-blue hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onPageChange("case-studies")}
              className="border-white text-white hover:bg-white hover:text-sky-blue px-8 py-4 text-lg"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
