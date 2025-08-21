import { ArrowRight, ExternalLink, BarChart3, Database, Code, Map, TrendingUp, Users, Clock, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudiesPageProps {
  onPageChange: (page: string) => void;
}

export function CaseStudiesPage({ onPageChange }: CaseStudiesPageProps) {
  const caseStudies = [
    {
      id: 1,
      title: 'E-commerce Sales Forecasting Platform',
      client: 'RetailMax Kenya',
      category: 'Data Science',
      icon: BarChart3,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Built an AI-powered sales forecasting system that improved inventory management and reduced stockouts by 40%.',
      challenge: 'RetailMax was struggling with inventory management, leading to frequent stockouts and overstock situations that affected profitability.',
      solution: 'We developed a machine learning platform that analyzes historical sales data, seasonal trends, and external factors to predict demand accurately.',
      results: [
        '40% reduction in stockouts',
        '25% improvement in inventory turnover',
        '15% increase in profit margins',
        '60% reduction in forecasting time'
      ],
      technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'PostgreSQL', 'React', 'Docker'],
      duration: '4 months',
      impact: 'High'
    },
    {
      id: 2,
      title: 'Real-time Supply Chain Analytics',
      client: 'LogisticsPro',
      category: 'Data Engineering',
      icon: Database,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      description: 'Implemented a real-time data pipeline processing millions of logistics events daily for operational insights.',
      challenge: 'LogisticsPro needed real-time visibility into their supply chain operations across multiple countries in East Africa.',
      solution: 'We built a scalable data engineering platform using Apache Kafka and Spark to process logistics data in real-time.',
      results: [
        '99.9% data pipeline uptime',
        '50% reduction in delivery delays',
        '30% improvement in route optimization',
        'Real-time dashboards for 100+ users'
      ],
      technologies: ['Apache Kafka', 'Apache Spark', 'AWS', 'Elasticsearch', 'Kibana', 'Python'],
      duration: '6 months',
      impact: 'High'
    },
    {
      id: 3,
      title: 'Agricultural Management Mobile App',
      client: 'FarmTech Solutions',
      category: 'Software Development',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
      description: 'Developed a comprehensive mobile application for farmers to manage crops, track weather, and optimize yields.',
      challenge: 'Small-scale farmers in Kenya lacked access to modern tools for crop management and weather monitoring.',
      solution: 'We created a user-friendly mobile app with offline capabilities, weather integration, and yield prediction features.',
      results: [
        '10,000+ active farmers',
        '20% average yield improvement',
        '4.8/5 app store rating',
        '80% user retention rate'
      ],
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Weather APIs', 'AWS', 'Firebase'],
      duration: '5 months',
      impact: 'Medium'
    },
    {
      id: 4,
      title: 'Wildlife Conservation GIS Platform',
      client: 'Kenya Wildlife Service',
      category: 'Geospatial Engineering',
      icon: Map,
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
      description: 'Created an advanced GIS platform for tracking wildlife movements and managing conservation efforts across national parks.',
      challenge: 'Wildlife tracking and conservation efforts were hampered by lack of centralized data and real-time monitoring capabilities.',
      solution: 'We developed a comprehensive GIS platform with GPS tracking, satellite imagery analysis, and predictive modeling.',
      results: [
        '95% improvement in tracking accuracy',
        '50% reduction in poaching incidents',
        '100+ rangers using the system',
        'Enhanced conservation decision-making'
      ],
      technologies: ['QGIS', 'PostGIS', 'Python', 'Leaflet', 'Satellite APIs', 'Machine Learning'],
      duration: '8 months',
      impact: 'High'
    },
    {
      id: 5,
      title: 'Financial Risk Assessment System',
      client: 'MicroFinance Plus',
      category: 'Data Science',
      icon: BarChart3,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
      description: 'Built an automated credit scoring system that reduced loan default rates and streamlined approval processes.',
      challenge: 'High default rates and manual loan approval processes were affecting the microfinance institution\'s growth.',
      solution: 'We developed an ML-based credit scoring system using alternative data sources and behavioral analytics.',
      results: [
        '35% reduction in default rates',
        '70% faster loan approvals',
        '25% increase in loan portfolio',
        '90% customer satisfaction'
      ],
      technologies: ['Python', 'XGBoost', 'API Development', 'PostgreSQL', 'Vue.js', 'Docker'],
      duration: '3 months',
      impact: 'High'
    },
    {
      id: 6,
      title: 'Smart City Traffic Optimization',
      client: 'Nairobi City County',
      category: 'Geospatial Engineering',
      icon: Map,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      description: 'Implemented an intelligent traffic management system using IoT sensors and predictive analytics.',
      challenge: 'Severe traffic congestion in Nairobi was causing economic losses and reduced quality of life.',
      solution: 'We deployed IoT sensors and created a real-time traffic optimization system with predictive routing.',
      results: [
        '30% reduction in average commute time',
        '20% decrease in fuel consumption',
        '50% improvement in traffic flow',
        'Better emergency response times'
      ],
      technologies: ['IoT Sensors', 'Apache Kafka', 'Machine Learning', 'GIS', 'React', 'Time Series Analysis'],
      duration: '12 months',
      impact: 'High'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Data Science': return BarChart3;
      case 'Data Engineering': return Database;
      case 'Software Development': return Code;
      case 'Geospatial Engineering': return Map;
      default: return BarChart3;
    }
  };

  const stats = [
    { icon: Award, value: '100+', label: 'Projects Delivered' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 gradient-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Case <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Studies</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped organizations across Kenya and East Africa achieve remarkable results through data-driven solutions.
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
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
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
            {caseStudies.map((study, index) => (
              <Card key={study.id} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
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
                    <span className="text-sm text-muted-foreground">{study.duration}</span>
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
                          <span className="text-sm text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
            Let's discuss how we can help you achieve similar results and transform your business through data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onPageChange('contact')}
              className="bg-white text-deep-blue hover:bg-gray-100"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onPageChange('services')}
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