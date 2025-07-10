import { motion } from "framer-motion";
import { BarChart3, FileText, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <BarChart3 className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your document analysis history and career progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Documents Analyzed
              </h3>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <p className="text-sm text-gray-600">Total documents reviewed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Average Score
              </h3>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">85</div>
            <p className="text-sm text-gray-600">Across all documents</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Time Saved
              </h3>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">24h</div>
            <p className="text-sm text-gray-600">Using AI analysis</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
