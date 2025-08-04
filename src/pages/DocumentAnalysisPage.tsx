import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  ArrowLeft,
  FileText,
  Award,
  Newspaper,
  Users,
  Medal,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { simulateAnalysis } from "@/utils/mockData";
import type { DocumentAnalysis } from "@/types";

type Route = {
  id: string;
  name: string;
  description: string;
  icon: any;
};

type EvidenceType = {
  id: string;
  name: string;
  description: string;
  icon: any;
};

const routes: Route[] = [
  {
    id: "visual-art",
    name: "Visual Art",
    description: "Submit documents for visual arts applications and portfolios",
    icon: Award,
  },
  {
    id: "combined-art",
    name: "Combined Art",
    description: "Submit documents for combined arts and interdisciplinary applications",
    icon: Medal,
  },
];

const evidenceTypes: EvidenceType[] = [
  {
    id: "cv",
    name: "CV",
    description: "Curriculum Vitae and professional background documents",
    icon: FileText,
  },
  {
    id: "media-coverage",
    name: "Media Coverage",
    description: "Press coverage, interviews, and media mentions",
    icon: Newspaper,
  },
  {
    id: "evidence-appearance",
    name: "Evidence of Appearance",
    description: "Documentation of public appearances and performances",
    icon: Users,
  },
  {
    id: "reference-letter",
    name: "Reference Letter",
    description: "Professional references and recommendation letters",
    icon: Award,
  },
  {
    id: "awards-recognition",
    name: "Awards and Recognition",
    description: "Certificates, awards, and professional recognitions",
    icon: Medal,
  },
];

export default function DocumentAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedEvidenceType, setSelectedEvidenceType] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysis | null>(
    null
  );

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    setAnalysisResult(null);
  };

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    setCurrentStep(2);
  };

  const handleEvidenceTypeSelect = (evidenceTypeId: string) => {
    setSelectedEvidenceType(evidenceTypeId);
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    setIsAnalyzing(true);
    try {
      const result = await simulateAnalysis();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSelectedRoute = () => routes.find(r => r.id === selectedRoute);
  const getSelectedEvidenceType = () => evidenceTypes.find(e => e.id === selectedEvidenceType);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Brain className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Document Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your route and evidence type, then upload your documents for instant AI-powered analysis.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-500'}`}>
                Choose Route
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-500'}`}>
                Evidence Type
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-500'}`}>
                Upload & Analyze
              </span>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Route Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Choose Your Route
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {routes.map((route) => {
                const IconComponent = route.icon;
                return (
                  <motion.button
                    key={route.id}
                    onClick={() => handleRouteSelect(route.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary-300 hover:shadow-md ${
                      selectedRoute === route.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 bg-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className={`h-12 w-12 mb-4 ${
                      selectedRoute === route.id ? 'text-primary-600' : 'text-gray-400'
                    }`} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {route.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {route.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Evidence Type Selection */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Choose Evidence Type
                </h2>
                <p className="text-gray-600 mt-1">
                  Selected route: <span className="font-medium text-primary-600">{getSelectedRoute()?.name}</span>
                </p>
              </div>
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evidenceTypes.map((evidenceType) => {
                const IconComponent = evidenceType.icon;
                return (
                  <motion.button
                    key={evidenceType.id}
                    onClick={() => handleEvidenceTypeSelect(evidenceType.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary-300 hover:shadow-md ${
                      selectedEvidenceType === evidenceType.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 bg-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className={`h-8 w-8 mb-3 ${
                      selectedEvidenceType === evidenceType.id ? 'text-primary-600' : 'text-gray-400'
                    }`} />
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {evidenceType.name}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {evidenceType.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Upload Section */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Upload Your Document
                </h2>
                <p className="text-gray-600 mt-1">
                  Route: <span className="font-medium text-primary-600">{getSelectedRoute()?.name}</span> | 
                  Evidence: <span className="font-medium text-primary-600">{getSelectedEvidenceType()?.name}</span>
                </p>
              </div>
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            </div>
            <FileUpload
              onFileSelect={handleFileSelect}
              maxFiles={1}
              maxSize={10}
              acceptedTypes={[".pdf", ".doc", ".docx", ".txt"]}
            />

            {selectedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>Start Analysis</span>
                    </div>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
                  <Brain className="h-8 w-8 text-primary-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analyzing Your Document
                </h3>
                <p className="text-gray-600">
                  Our AI is carefully reviewing your document and preparing
                  detailed feedback...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBackgroundColor(
                      analysisResult.score!
                    )} mb-4`}
                  >
                    <span
                      className={`text-2xl font-bold ${getScoreColor(
                        analysisResult.score!
                      )}`}
                    >
                      {analysisResult.score}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Analysis Complete
                  </h3>
                  <p className="text-gray-600">
                    Your document has been analyzed and scored based on
                    professional standards.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {analysisResult.strengths?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Strengths</div>
                  </div>
                  <div className="text-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {analysisResult.improvements?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Improvements</div>
                  </div>
                  <div className="text-center">
                    <Lightbulb className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {analysisResult.recommendations?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Recommendations</div>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              {analysisResult.strengths &&
                analysisResult.strengths.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        Strengths
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {analysisResult.strengths.map((strength, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-700">{strength}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Improvements */}
              {analysisResult.improvements &&
                analysisResult.improvements.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        Areas for Improvement
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {analysisResult.improvements.map((improvement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-700">{improvement}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Recommendations */}
              {analysisResult.recommendations &&
                analysisResult.recommendations.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Lightbulb className="h-6 w-6 text-blue-500" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        Recommendations
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {analysisResult.recommendations.map(
                        (recommendation, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-700">{recommendation}</p>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
