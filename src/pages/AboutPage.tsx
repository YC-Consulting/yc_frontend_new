import { motion } from "framer-motion";
import { Heart, Users, Target, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heart className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Yichuan AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're passionate about helping professionals showcase their talents
            and achieve their career goals through AI-powered document analysis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <Target className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To democratize access to professional document review and career
              advisory services through cutting-edge AI technology, helping
              professionals worldwide present their best selves.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <Users className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Our Community
            </h3>
            <p className="text-gray-600">
              We've helped thousands of professionals improve their resumes,
              cover letters, and portfolios. Our community spans across
              industries and continents.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <Award className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-gray-600 text-sm">
                Advanced algorithms analyze your documents with precision and
                speed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure</h4>
              <p className="text-gray-600 text-sm">
                Your documents are processed with enterprise-grade security.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Actionable</h4>
              <p className="text-gray-600 text-sm">
                Get specific, actionable recommendations to improve your
                documents.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
