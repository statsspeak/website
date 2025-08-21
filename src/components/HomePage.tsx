import { useState, useEffect } from "react";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Users,
  Star,
  TrendingUp,
  Globe,
  Shield,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Dynamic text rotation for tagline
  const rotatingTexts = [
    "Data Engineering",
    "Software Engineering",
    "Geospatial Engineering",
  ];

  const services = [
    {
      title: "Data Science & Analytics",
      description:
        "Transform raw data into actionable business insights with advanced analytics and machine learning solutions.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      features: [
        "Predictive Analytics",
        "Machine Learning",
        "Statistical Modeling",
        "Business Intelligence",
      ],
    },
    {
      title: "Data Engineering",
      description:
        "Build robust data pipelines and infrastructure for scalable data processing and real-time analytics.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      features: [
        "ETL Pipelines",
        "Data Warehousing",
        "Cloud Architecture",
        "Real-time Processing",
      ],
    },
    {
      title: "Software Development",
      description:
        "Custom software solutions tailored to your business needs with modern technologies and best practices.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      features: [
        "Web Applications",
        "Mobile Apps",
        "API Development",
        "System Integration",
      ],
    },
    {
      title: "Geospatial Engineering",
      description:
        "Leverage location-based data for mapping, spatial analysis, and location intelligence solutions.",
      image:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop",
      features: [
        "GIS Solutions",
        "Spatial Analysis",
        "Remote Sensing",
        "Location Intelligence",
      ],
    },
  ];

  const partners = [
    {
      name: "AMREF Health Africa",
      logo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=100&fit=crop",
      description: "Leading health organization in Africa",
    },
    {
      name: "Ministry of Health Kenya",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop",
      description: "Government health ministry",
    },
    {
      name: "Kenya Wildlife Service",
      logo: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=200&h=100&fit=crop",
      description: "Conservation and wildlife management",
    },
    {
      name: "Nairobi City County",
      logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=100&fit=crop",
      description: "Municipal government services",
    },
    {
      name: "University of Nairobi",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=100&fit=crop",
      description: "Leading academic institution",
    },
    {
      name: "Kenya Commercial Bank",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop",
      description: "Financial services provider",
    },
  ];

  const directors = [
    {
      name: "Dr. David Kiprotich",
      role: "Chief Executive Officer & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "PhD in Data Science from Stanford University with 10+ years of experience in machine learning and analytics. Former senior data scientist at Google and Microsoft.",
      specialties: [
        "Machine Learning",
        "Statistical Modeling",
        "Big Data Analytics",
        "AI Strategy",
      ],
      linkedin: "#",
    },
    {
      name: "Sarah Wanjiku, MSc",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Masters in Computer Science from MIT with expertise in distributed systems and cloud architecture. Previously led engineering teams at Amazon and Netflix.",
      specialties: [
        "Cloud Architecture",
        "Data Engineering",
        "DevOps",
        "System Design",
      ],
      linkedin: "#",
    },
    {
      name: "Michael Odhiambo, PhD",
      role: "Director of Research & Innovation",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "PhD in Geospatial Engineering from University of Cambridge. Leading researcher in spatial analysis and remote sensing applications for Africa.",
      specialties: [
        "GIS Development",
        "Remote Sensing",
        "Spatial Analysis",
        "Research",
      ],
      linkedin: "#",
    },
  ];

  const testimonials = [
    {
      quote:
        "Statsspeak transformed our health data systems and helped us make evidence-based decisions that save lives.",
      author: "Dr. Mary Nyong'o",
      role: "Director, AMREF Health Africa",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote:
        "Their geospatial solutions revolutionized our wildlife conservation efforts across Kenya's national parks.",
      author: "John Konchellah",
      role: "Director General, Kenya Wildlife Service",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote:
        "Professional, innovative, and delivered beyond our expectations. Statsspeak is our trusted technology partner.",
      author: "Anne Kananu",
      role: "Deputy Governor, Nairobi City County",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
  ];

  // Auto-rotate text - Updated to 1.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 1500); // Change text every 1.5 seconds

    return () => clearInterval(timer);
  }, [rotatingTexts.length]);

  return (
    <div className="w-full">
      {/* Hero Section - Full width with enhanced scaling */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Vibrant Background Image - Full visibility */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
            alt="Data network visualization over satellite map"
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay for text readability - much lighter */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-slate-900/20 to-slate-900/30"></div>
        </div>

        {/* Subtle data network pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="data-network-background w-full h-full"></div>
        </div>

        {/* Animated background elements - more vibrant */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-blue/30 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-medium-blue/25 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/3 w-3 h-32 bg-gradient-to-b from-primary-blue/50 to-transparent rotate-45 animate-glowing-lines"></div>
          <div
            className="absolute top-1/4 right-1/4 w-3 h-24 bg-gradient-to-b from-medium-blue/50 to-transparent rotate-12 animate-glowing-lines"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-2 h-20 bg-gradient-to-b from-primary-blue/40 to-transparent rotate-75 animate-glowing-lines"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center space-y-8 xl:space-y-10 2xl:space-y-12 max-w-5xl">
              {/* <div className="inline-flex items-center px-4 py-2 bg-white/95 rounded-full border border-primary-blue/30 shadow-lg backdrop-blur-sm">
                <Star className="w-4 h-4 text-primary-blue mr-2" />
                <span className="text-sm font-medium text-primary-blue">
                  Trusted by 50+ Organizations
                </span>
              </div> */}

              <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                <span
                  className="block text-white drop-shadow-xl"
                  style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.8)" }}
                >
                  Unlocking Insights,
                </span>
                <span
                  className="block text-white drop-shadow-xl"
                  style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.8)" }}
                >
                  Building Solutions:
                </span>

                {/* Dynamic rotating text - Enhanced visibility */}
                <span
                  className="block text-white drop-shadow-xl text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mt-4 min-h-[1.2em]"
                  style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.8)" }}
                >
                  Your partner in{" "}
                  <span
                    className="text-primary-blue font-bold inline-block min-w-[280px] text-left"
                    style={{
                      textShadow:
                        "3px 3px 8px rgba(0,0,0,0.9), 0 0 20px rgba(26, 117, 149, 0.5)",
                    }}
                  >
                    {rotatingTexts[currentTextIndex]}
                  </span>
                </span>
              </h1>

              <p
                className="text-lg xl:text-xl 2xl:text-2xl text-white leading-relaxed max-w-4xl mx-auto drop-shadow-lg"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
              >
                Leading data science and technology consultancy empowering
                organizations across Kenya and East Africa to unlock insights,
                drive innovation, and achieve sustainable growth through
                cutting-edge solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 xl:gap-6 justify-center">
                <Button
                  size="2xl"
                  onClick={() => onPageChange("services")}
                  className="bg-primary-blue/95 backdrop-blur-sm hover:bg-primary-blue text-white px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl group shadow-2xl border border-primary-blue/50"
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5 xl:h-6 xl:w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="2xl"
                  variant="outline"
                  onClick={() => onPageChange("case-studies")}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary-blue px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl group shadow-2xl"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                  <PlayCircle className="mr-2 h-5 w-5 xl:h-6 xl:w-6" />
                  View Case Studies
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 xl:gap-12 pt-8 border-t border-white/40 max-w-2xl mx-auto">
                <div className="text-center">
                  <div
                    className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white drop-shadow-xl"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    100+
                  </div>
                  <div
                    className="text-sm xl:text-base text-gray-100 drop-shadow-md"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                  >
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white drop-shadow-xl"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    50+
                  </div>
                  <div
                    className="text-sm xl:text-base text-gray-100 drop-shadow-md"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                  >
                    Clients
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white drop-shadow-xl"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    5+
                  </div>
                  <div
                    className="text-sm xl:text-base text-gray-100 drop-shadow-md"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                  >
                    Years
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Full width */}
      <section className="py-16 xl:py-20 2xl:py-24 bg-white h-screen">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex flex-col items-center justify-evenly h-full">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6">
              Trusted <span className="text-primary-blue">Partners</span>
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-4xl mx-auto">
              We're proud to work with leading organizations across Kenya and
              East Africa, delivering impactful solutions that drive real
              change.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-6 xl:gap-8 2xl:gap-10 max-w-7xl mx-auto">
            {partners.map((partner, index) => (
              <div key={index} className="group text-center">
                <div className="bg-gray-50 rounded-2xl p-6 xl:p-8 mb-4 transition-all duration-300 group-hover:bg-light-blue group-hover:shadow-lg">
                  <ImageWithFallback
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-16 xl:h-20 object-contain mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h4 className="font-semibold text-sm xl:text-base text-center mb-1">
                  {partner.name}
                </h4>
                <p className="text-xs xl:text-sm text-muted-foreground text-center">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview - Full width */}
      <section className="py-16 xl:py-20 2xl:py-24 bg-gradient-to-br from-light-blue/20 to-primary-blue-lighter/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6">
              Our <span className="text-primary-blue">Expertise</span>
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Comprehensive data solutions designed to unlock insights, drive
              innovation, and accelerate your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 xl:h-80 2xl:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 xl:p-8 2xl:p-10">
                  <CardTitle className="text-xl xl:text-2xl 2xl:text-3xl mb-4 text-primary-blue">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed text-base xl:text-lg 2xl:text-xl">
                    {service.description}
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-3 xl:gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 xl:h-5 xl:w-5 text-primary-blue mr-2 flex-shrink-0" />
                        <span className="text-sm xl:text-base text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 xl:mt-16">
            <Button
              size="2xl"
              onClick={() => onPageChange("services")}
              className="bg-primary-blue hover:bg-primary-blue-dark text-white px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 xl:h-6 xl:w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Directors Section - Full width */}
      <section className="py-16 xl:py-20 2xl:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6">
              Leadership <span className="text-primary-blue">Team</span>
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Meet the visionary leaders driving Statsspeak's mission to
              transform Africa through data intelligence.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16 max-w-7xl mx-auto">
            {directors.map((director, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={director.image}
                    alt={director.name}
                    className="w-full h-80 xl:h-96 2xl:h-[28rem] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 xl:p-8 2xl:p-10">
                  <div className="text-center mb-6">
                    <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2">
                      {director.name}
                    </h3>
                    <p className="text-primary-blue font-semibold text-base xl:text-lg 2xl:text-xl">
                      {director.role}
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm xl:text-base 2xl:text-lg">
                    {director.bio}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary-blue text-sm xl:text-base">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {director.specialties.map((specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="px-3 py-1 bg-light-blue text-primary-blue rounded-full text-xs xl:text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Full width */}
      <section className="py-16 xl:py-20 2xl:py-24 bg-gradient-to-br from-light-blue/20 to-primary-blue-lighter/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6">
              What Our <span className="text-primary-blue">Partners Say</span>
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-muted-foreground">
              Don't just take our word for it - hear from our satisfied partners
              and clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white relative"
              >
                <CardContent className="p-6 xl:p-8 2xl:p-10">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 xl:h-6 xl:w-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed text-base xl:text-lg 2xl:text-xl">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 xl:w-20 xl:h-20 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-base xl:text-lg 2xl:text-xl">
                        {testimonial.author}
                      </div>
                      <div className="text-primary-blue font-medium text-sm xl:text-base">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Full width */}
      <section className="py-16 xl:py-20 2xl:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6">
              Why Choose <span className="text-primary-blue">Statsspeak</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8 xl:gap-12 2xl:gap-16 max-w-7xl mx-auto">
            <Card className="border-0 shadow-lg text-center p-6 xl:p-8 2xl:p-10 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-white" />
              </div>
              <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4">
                Trusted Expertise
              </h3>
              <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">
                Proven track record with government agencies and leading
                organizations across Africa.
              </p>
            </Card>

            <Card className="border-0 shadow-lg text-center p-6 xl:p-8 2xl:p-10 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-medium-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-white" />
              </div>
              <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4">
                Measurable Results
              </h3>
              <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">
                Data-driven solutions that deliver quantifiable business impact
                and ROI.
              </p>
            </Card>

            <Card className="border-0 shadow-lg text-center p-6 xl:p-8 2xl:p-10 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-primary-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-white" />
              </div>
              <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4">
                Local Understanding
              </h3>
              <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">
                Deep understanding of African markets, challenges, and
                opportunities.
              </p>
            </Card>

            <Card className="border-0 shadow-lg text-center p-6 xl:p-8 2xl:p-10 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-white" />
              </div>
              <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4">
                Global Standards
              </h3>
              <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">
                International best practices combined with local expertise and
                insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Full width */}
      <section className="py-16 xl:py-20 2xl:py-24 bg-gradient-to-r from-primary-blue to-medium-blue">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-primary-blue-light mb-8 max-w-3xl mx-auto">
            Join leading organizations across Africa who trust Statsspeak to
            unlock insights, drive innovation, and achieve sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 xl:gap-6 justify-center">
            <Button
              size="2xl"
              onClick={() => onPageChange("contact")}
              className="bg-white text-primary-blue hover:bg-gray-100 px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 xl:h-6 xl:w-6" />
            </Button>
            <Button
              size="2xl"
              variant="outline"
              onClick={() => onPageChange("about")}
              className="border-white text-white hover:bg-white hover:text-primary-blue px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
