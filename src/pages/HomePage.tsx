import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  Zap,
  FileText,
  Users,
  TrendingUp,
  Brain,
  Clock,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import type { ServiceCard, Feature } from "@/types";

const services: ServiceCard[] = [
  {
    title: "AI Document Analysis",
    description:
      "Upload your documents for professional AI analysis. Get detailed insights and improvement recommendations.",
    icon: "FileText",
    buttonText: "Start Analysis",
    buttonStyle: "primary",
    href: "/document-analysis",
  },
  {
    title: "Community Hub",
    description:
      "Discover open calls, residencies, exhibitions, and grants for creative professionals.",
    icon: "Users",
    buttonText: "Explore Now",
    buttonStyle: "secondary",
    href: "/community-hub",
  },
  {
    title: "Career Advisory",
    description:
      "Get personalized career guidance and strategic advice from industry experts.",
    icon: "TrendingUp",
    buttonText: "Learn More",
    buttonStyle: "secondary",
    href: "/about",
  },
];

const features: Feature[] = [
  {
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms provide detailed insights and recommendations for your documents.",
    icon: "Brain",
    color: "yellow",
  },
  {
    title: "Secure & Private",
    description:
      "Your documents are processed securely with enterprise-grade encryption.",
    icon: "Shield",
    color: "blue",
  },
  {
    title: "Fast Results",
    description: "Get comprehensive analysis results in minutes, not hours.",
    icon: "Clock",
    color: "green",
  },
];

const IconMap = {
  FileText,
  Users,
  TrendingUp,
  Brain,
  Shield,
  Clock,
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Professional Document Review &
                <span className="text-primary-500"> Career Advisory</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                AI-powered document analysis and expert guidance to help
                professionals showcase their talents and achievements
                effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/document-analysis"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Upload Document
                </Link>
                <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                  Learn More
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Fast Results</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <Brain className="h-20 w-20 text-primary-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for professionals seeking to enhance their
              career prospects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent =
                IconMap[service.icon as keyof typeof IconMap];
              return (
                <motion.div
                  key={service.title}
                  className="bg-white rounded-xl shadow-lg p-8 card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link
                    to={service.href}
                    className={
                      service.buttonStyle === "primary"
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                  >
                    {service.buttonText}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Choose Yichuan AI?
              </h2>
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const IconComponent =
                    IconMap[feature.icon as keyof typeof IconMap];
                  const colorClasses = {
                    yellow: "bg-yellow-100 text-yellow-600",
                    blue: "bg-blue-100 text-blue-600",
                    green: "bg-green-100 text-green-600",
                  };

                  return (
                    <motion.div
                      key={feature.title}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          colorClasses[
                            feature.color as keyof typeof colorClasses
                          ]
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-primary-400 to-orange-500 rounded-2xl p-1">
                <div className="bg-white rounded-xl p-8">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <FileText className="h-20 w-20 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Y</span>
                </div>
                <span className="text-xl font-bold">Yichuan AI</span>
              </div>
              <p className="text-gray-400">
                Professional document review and career advisory services
                powered by AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/document-analysis"
                    className="hover:text-white transition-colors"
                  >
                    Document Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Career Advisory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community-hub"
                    className="hover:text-white transition-colors"
                  >
                    Community Hub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Yichuan AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
