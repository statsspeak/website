import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

export function ContactPage({ onPageChange }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
      title: "Business Hours",
      detail: "Mon - Fri: 9AM - 6PM EAT",
      link: null,
    },
  ];

  const faqs = [
    {
      question: "What types of projects do you work on?",
      answer:
        "We work on data science, data engineering, software development, and geospatial engineering projects across various industries including finance, agriculture, healthcare, and logistics.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on complexity and scope. Small projects may take 2-4 weeks, while larger enterprise solutions can take 3-6 months. We provide detailed timelines during our initial consultation.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, we offer comprehensive support and maintenance packages to ensure your solutions continue to perform optimally. We also provide training for your team.",
    },
    {
      question: "What is your pricing model?",
      answer:
        "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project scope, complexity, and timeline.",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="max-w-md mx-auto border-0 shadow-xl text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest. We'll get back to you within 24
              hours.
            </p>
            <Button onClick={() => onPageChange("home")} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 gradient-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Get In{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Touch
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with data? Let's discuss your
              project and explore how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Start Your Project</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your.email@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Needed *</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="data-science">
                              Data Science & Analytics
                            </SelectItem>
                            <SelectItem value="data-engineering">
                              Data Engineering
                            </SelectItem>
                            <SelectItem value="software-development">
                              Software Development
                            </SelectItem>
                            <SelectItem value="geospatial">
                              Geospatial Engineering
                            </SelectItem>
                            <SelectItem value="consulting">
                              Consulting
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Project Budget</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) =>
                            handleInputChange("budget", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">
                              Under $50,000
                            </SelectItem>
                            <SelectItem value="50k-100k">
                              $50,000 - $100,000
                            </SelectItem>
                            <SelectItem value="100k-250k">
                              $100,000 - $250,000
                            </SelectItem>
                            <SelectItem value="250k-500k">
                              $250,000 - $500,000
                            </SelectItem>
                            <SelectItem value="over-500k">
                              Over $500,000
                            </SelectItem>
                            <SelectItem value="discuss">
                              Prefer to discuss
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Tell us about your project, challenges, and goals..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-vibrant-blue to-vibrant-purple text-white"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-vibrant-blue to-vibrant-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{info.title}</div>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-vibrant-blue transition-colors"
                          >
                            {info.detail}
                          </a>
                        ) : (
                          <div className="text-muted-foreground">
                            {info.detail}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-vibrant-blue to-vibrant-purple text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Why Choose StatsSpeak?
                  </h3>
                  <ul className="space-y-3 text-blue-100">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      Expert team with proven track record
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      Custom solutions tailored to your needs
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      Transparent communication throughout
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      Ongoing support and maintenance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about our services and process
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map/Location Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-muted-foreground">
              Located in the heart of Nairobi, Kenya's tech hub
            </p>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <MapPin className="h-12 w-12 text-vibrant-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">StatsSpeak Offices</h3>
            <p className="text-muted-foreground mb-4">
              Westlands, Nairobi
              <br />
              Kenya
            </p>
            <p className="text-sm text-muted-foreground">
              We're open Monday to Friday, 9AM to 6PM EAT.
              <br />
              Schedule a meeting to visit our office and meet the team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
