import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Heart,
  Award,
  Globe,
  Code,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import washington from "../assets/team-photos/washington-ogol.jpeg";
import anthony from "../assets/team-photos/Antony.jpeg";
import alloys from "../assets/team-photos/alloys-mila.jpeg";
import anne from "../assets/team-photos/anne-ngatia.jpeg";
import joan from "../assets/team-photos/Joan.jpg";
import joram from "../assets/team-photos/joram-kabach.jpeg";
import kelvin from "../assets/team-photos/kelvin-adungosi.jpeg";
import nancy from "../assets/team-photos/Nancy.png";
import LeadershipCarousel from "./Team";

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in every project, delivering solutions that exceed expectations and drive real business value.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace cutting-edge technologies and innovative approaches to solve complex data challenges and create competitive advantages.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We maintain the highest standards of integrity, transparency, and ethical practices in all our client relationships and data handling.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in collaborative partnerships, working closely with our clients to understand their needs and achieve shared success.",
    },
  ];

  const directors = [
    {
      name: "Washington Ogol",
      role: "Chief Executive Officer & Co-Founder",
      image: washington,
      bio: "In the realm of leadership, Washington Ogol stands out as a beacon of team collaboration. As the Chief Executive Officer, he embodies a profound affinity for team membership, exemplifying a people-focused approach that permeates our organizational culture.",
      specialties: [
        "Data Strategy",
        "Data Engineering",
        "Data Analytics & ML",
        "Data Consultancy",
      ],
      linkedin: "#",
    },
    {
      name: "Anthony Ngatia",
      role: "Chief Health Officer",
      image: anthony,
      bio: "Anthony Ngatia is a dedicated health professional with over 15 years of experience in public health and wellness. As the Chief Health Officer, he leads our health initiatives, ensuring the well-being of our community through innovative programs and strategic health policies. Anthony's expertise in preventive healthcare and his passion for improving health outcomes make him an invaluable asset to our team.",
      specialties: [
        "Global Health Data Scientist",
        "Public Health Strategist",
        "Consultant",
      ],
      linkedin: "#",
    },
    {
      name: "Joram Kabach",
      role: "Chief Strategy Officer",
      image: joram,
      bio: "Joram Kabach is a seasoned operations expert with a passion for driving efficiency and excellence. As the Chief Strategy Officer, he oversees our day-to-day operations and ensures that our processes are optimized for success.",
      specialties: [
        "Entrepreneurship",
        "AG-Tech",
        "ED-Tech",
        "E-Commerce",
        "AI",
      ],
      linkedin: "#",
    },
    {
      name: "Anne Ngatia",
      role: "Chief Marketing and Communications Officer",
      image: anne,
      bio: "Anne Ngatia brings a unique blend of marketing, storytelling, and project management skills to the table. As the Chief Marketing & Communications Officer, she leads our marketing strategies to attract and engage businesses, consumers and clients, in turn enhancing our brand's image and overall reputation.",
      specialties: [
        "Strategic planning ",
        "Brand Management",
        "Data-Driven Decision Making",
      ],
      linkedin: "#",
    },
    {
      name: "Alloys Mila",
      role: "Chief Technology Officer",
      image: alloys,
      bio: "Alloys Mila is a visionary technologist with a knack for turning ideas into reality. As the Chief Technology Officer, he leads our technology team in developing innovative solutions that drive business growth and enhance customer experiences.",
      specialties: [
        "Product & Engineering Leader",
        "Computer Engineering",
        "Software Development",
      ],
      linkedin: "#",
    },
    {
      name: "Nancy Kinyua",
      role: "Consultant",
      image: nancy,
      bio: "Nancy Kinyua is a seasoned geospatial expert with a passion for driving business growth. As the Lead Geospatial Consultant, she is responsible for overseeing the geospatial health of the organization and ensuring that our geospatial strategies align with our long-term goals.",
      specialties: ["GIS Development", "Data Analytics", "Data Storytelling"],
      linkedin: "#",
    },
    {
      name: "Joanita Kisembo",
      role: "Head Project Manager",
      image: joan,
      bio: "Joanita Kisembo is a seasoned project manager with a passion for driving business growth. As the Head Project Manager, she is responsible for overseeing the project health of the organization and ensuring that our project strategies align with our long-term goals.",
      specialties: ["Data Analyst", "Business Analyst", "Project Management"],
      linkedin: "#",
    },
    {
      name: "Kelvin Adungosi",
      role: "Head of Software & Data",
      image: kelvin,
      bio: "Kelvin Adungosi is the Head of Software & Data, a leader with a specialized background in data and technology. He focuses on three key areas: Enterprise Data Strategy, where he designs comprehensive plans for organizations to effectively use their data; Data Operations (Data Ops), where he builds and manages efficient data pipelines; and AI Development, where he creates advanced, data-driven solutions. His expertise lies in transforming raw data into powerful assets that drive innovation and business growth.",
      specialties: ["Enterprise Data Strategy", "Data Ops", "AI Development"],
      linkedin: "#",
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description:
        "StatsSpeak was established with a vision to democratize data science in Kenya.",
    },
    {
      year: "2020",
      title: "First Major Contract",
      description:
        "Secured our first enterprise client and delivered a successful predictive analytics platform.",
    },
    {
      year: "2021",
      title: "Team Expansion",
      description:
        "Grew our team to include specialists in data engineering and geospatial analysis.",
    },
    {
      year: "2022",
      title: "Regional Recognition",
      description:
        "Won the East Africa Data Innovation Award for our work in agricultural technology.",
    },
    {
      year: "2023",
      title: "50+ Successful Projects",
      description:
        "Reached the milestone of 50 completed projects across various industries.",
    },
    {
      year: "2024",
      title: "AI Innovation Lab",
      description:
        "Launched our AI Innovation Lab focusing on cutting-edge research and development.",
    },
  ];

  const stats = [
    { icon: Award, value: "100+", label: "Projects Completed" },
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Globe, value: "3", label: "Countries Served" },
    { icon: Code, value: "5+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 gradient-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  StatsSpeak
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                We're a passionate team of data scientists, engineers, and
                developers dedicated to transforming businesses through the
                power of data and technology.
              </p>
              <Button
                size="lg"
                onClick={() => onPageChange("contact")}
                className="bg-white text-deep-blue hover:bg-gray-100"
              >
                Work With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
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

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To empower businesses across Kenya and East Africa with
                cutting-edge data solutions that drive growth, innovation, and
                competitive advantage in the digital economy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that every organization, regardless of size, should
                have access to the transformative power of data science and
                modern technology solutions.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To be the leading data science and technology consulting firm in
                East Africa, known for delivering exceptional solutions that
                create lasting impact for our clients and communities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where data-driven decision making is
                accessible to all organizations, fostering innovation and
                sustainable growth across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core values guide everything we do and shape our
              interactions with clients, partners, and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-vibrant-blue to-vibrant-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <LeadershipCarousel directors={directors} />

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our growth and evolution as a leading data
              consultancy.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-vibrant-blue to-vibrant-purple rounded-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0
                        ? "lg:text-right lg:pr-8"
                        : "lg:text-left lg:pl-8"
                    }`}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-vibrant-blue to-vibrant-purple rounded-full flex items-center justify-center text-white font-bold">
                            {milestone.year.slice(-2)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {milestone.title}
                            </CardTitle>
                            <CardDescription className="text-vibrant-blue font-medium">
                              {milestone.year}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-vibrant-blue to-vibrant-purple rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to partner with us? Let's explore how we can help transform
            your business through data and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onPageChange("contact")}
              className="bg-white text-deep-blue hover:bg-gray-100"
            >
              Get In Touch
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
