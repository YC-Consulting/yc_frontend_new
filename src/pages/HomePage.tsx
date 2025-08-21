import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  Zap,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";
import type { ServiceCard } from "@/types";

const services: ServiceCard[] = [
  {
    title: "AI Document Analysis",
    description:
      "Upload your documents for professional AI analysis. Get detailed insights and improvement recommendations.",
    icon: "FileText",
    buttonText: "Start Analysis",
    buttonStyle: "secondary",
    href: "/document-analysis",
  },
  {
    title: "Media Resources",
    description:
      "Discover open calls, residencies, exhibitions, and grants for creative professionals.",
    icon: "Users",
    buttonText: "Explore Now",
    buttonStyle: "secondary",
    href: "/media-resources",
  },
  {
    title: "Personalised Advisory",
    description:
      "Get personalized career guidance and strategic advice from industry experts.",
    icon: "TrendingUp",
    buttonText: "Learn More",
    buttonStyle: "secondary",
    href: "/about",
  },
];

const IconMap = {
  FileText,
  Users,
  TrendingUp,
  Shield,
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
                Professional Document
                <span className="text-primary-500"> Review & Advisory</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                AI-powered document analysis and expert guidance to help creative professionals 
                get approved by Arts Council England, promote their creative practice, and 
                get matched with suitable opportunities and resources.
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
                <div className="w-full h-64 bg-white rounded-xl flex items-center justify-center p-4">
                  <img 
                    src="/1.png" 
                    alt="Professional document success illustration" 
                    className="w-full h-full object-contain"
                  />
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
              Comprehensive solutions for creative professionals seeking Arts Council England 
              approval, creative practice promotion, and resource matching
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent =
                IconMap[service.icon as keyof typeof IconMap];
              return (
                <motion.div
                  key={service.title}
                  className="bg-white rounded-xl shadow-lg p-8 card-hover h-full flex flex-col"
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
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
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
                    to="/media-resources"
                    className="hover:text-white transition-colors"
                  >
                    Media Resources
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
                  <Link
                    to="/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <a
                href="mailto:yichuaned@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                yichuaned@gmail.com
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
