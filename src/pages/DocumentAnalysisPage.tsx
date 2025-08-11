import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  FileText,
  Award,
  Newspaper,
  Users,
  Medal,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";
import api from "@/utils/api";
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
    id: "visual_art",
    name: "Visual Art",
    description: "Submit documents for visual arts applications and portfolios",
    icon: Award,
  },
  {
    id: "combined_art",
    name: "Combined Art",
    description:
      "Submit documents for combined arts and interdisciplinary applications",
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
    id: "media_coverage",
    name: "Media Coverage",
    description: "Press coverage, interviews, and media mentions",
    icon: Newspaper,
  },
  {
    id: "evidence_of_appearance",
    name: "Evidence of Appearance",
    description: "Documentation of public appearances and performances",
    icon: Users,
  },
  {
    id: "reference_letter",
    name: "Reference Letter",
    description: "Professional references and recommendation letters",
    icon: Award,
  },
  {
    id: "awards_and_recognition",
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
  const [analysisStatus, setAnalysisStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);

  // Cleanup polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval]);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    setAnalysisResult(null);
  };

  const handleFileRemove = (files: File[]) => {
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

  const uploadDocuments = async () => {
    if (selectedFiles.length === 0) return;

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("document_route", selectedRoute);
      formData.append("document_type", selectedEvidenceType);

      const response = await api.post("/website/document/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.documents;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Upload failed");
    }
  };

  const startAnalysis = async (documentId: string) => {
    try {
      const response = await api.post("/website/document/analyze", {
        id: documentId,
      });

      setAnalysisStatus(response.data.status);
      return response.data.analysis_id;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Analysis failed to start"
      );
    }
  };

  const pollAnalysisStatus = async (analysisId: string) => {
    try {
      const response = await api.get(
        `/website/document/analysis/status?id=${analysisId}`
      );
      const status = response.data.status;
      console.log(`Analysis status for ${analysisId}:`, status);
      setAnalysisStatus(status);

      if (status === "completed") {
        console.log("Analysis completed, stopping polling...");
        // Get the full analysis results
        const analysisResponse = await api.get(
          `/website/document/analysis/get?document_id=${response.data.document_id}`
        );
        console.log("Analysis results received:", analysisResponse.data);

        // Parse the analysis_result if it's a Python dict string
        let analysisData = analysisResponse.data.analysis;
        if (analysisData && analysisData.analysis_result) {
          // Extract the analysis text from the Python dict string
          const analysisString = analysisData.analysis_result;
          const analysisMatch = analysisString.match(
            /'analysis':\s*'(.*?)',\s*'format'/s
          );

          if (analysisMatch) {
            // Clean up the extracted analysis text
            const cleanedAnalysis = analysisMatch[1]
              .replace(/\\n/g, "\n") // Convert \\n to actual line breaks
              .replace(/\\'/g, "'") // Convert \' to '
              .replace(/\*\*/g, "") // Remove markdown bold **
              .replace(/### /g, "") // Remove markdown headers ###
              .replace(/#### /g, "") // Remove markdown headers ####
              .replace(/---/g, "\n" + "=".repeat(50) + "\n") // Replace --- with visual divider
              .replace(/\n\s+/g, "\n") // Clean up indented lines
              .replace(/\n{3,}/g, "\n\n") // Limit consecutive line breaks
              .trim();

            analysisData = {
              ...analysisData,
              analysis_text: cleanedAnalysis,
            };
          }
        }

        console.log("Processed analysis data:", analysisData);
        setAnalysisResult(analysisData);
        return true; // Analysis complete
      } else if (status === "failed") {
        throw new Error(response.data.error_message || "Analysis failed");
      }

      return false; // Still processing
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Failed to get analysis status"
      );
    }
  };

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    // Clear any existing polling interval
    if (pollInterval) {
      clearInterval(pollInterval);
      setPollInterval(null);
    }

    setIsAnalyzing(true);
    setError("");
    setAnalysisResult(null);

    try {
      // Step 1: Upload documents
      const documents = await uploadDocuments();

      if (documents && documents.length > 0) {
        // Step 2: Start analysis on the first document
        const analysisId = await startAnalysis(documents[0].id);

        // Step 3: Poll for completion
        const interval = setInterval(async () => {
          try {
            console.log("Polling analysis status...");
            const isComplete = await pollAnalysisStatus(analysisId);
            console.log("Polling result - isComplete:", isComplete);
            if (isComplete) {
              console.log("Clearing polling interval...");
              clearInterval(interval);
              setPollInterval(null);
              setIsAnalyzing(false);
            }
          } catch (error: any) {
            console.log("Polling error:", error);
            clearInterval(interval);
            setPollInterval(null);
            setError(error.message);
            setIsAnalyzing(false);
          }
        }, 5000); // Poll every 5 seconds

        setPollInterval(interval);
      }
    } catch (error: any) {
      setError(error.message);
      setIsAnalyzing(false);
    }
  };

  const getSelectedRoute = () => routes.find((r) => r.id === selectedRoute);
  const getSelectedEvidenceType = () =>
    evidenceTypes.find((e) => e.id === selectedEvidenceType);

  // Cleanup polling interval on component unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        console.log("Component unmounting, clearing poll interval...");
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval]);

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
            Choose your route and evidence type, then upload your documents for
            instant AI-powered analysis.
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
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= 1 ? "text-primary-600" : "text-gray-500"
                }`}
              >
                Choose Route
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= 2 ? "text-primary-600" : "text-gray-500"
                }`}
              >
                Evidence Type
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 3
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= 3 ? "text-primary-600" : "text-gray-500"
                }`}
              >
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
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-200 bg-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent
                      className={`h-12 w-12 mb-4 ${
                        selectedRoute === route.id
                          ? "text-primary-600"
                          : "text-gray-400"
                      }`}
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {route.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{route.description}</p>
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
                  Selected route:{" "}
                  <span className="font-medium text-primary-600">
                    {getSelectedRoute()?.name}
                  </span>
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
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-200 bg-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent
                      className={`h-8 w-8 mb-3 ${
                        selectedEvidenceType === evidenceType.id
                          ? "text-primary-600"
                          : "text-gray-400"
                      }`}
                    />
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
                  Route:{" "}
                  <span className="font-medium text-primary-600">
                    {getSelectedRoute()?.name}
                  </span>{" "}
                  | Evidence:{" "}
                  <span className="font-medium text-primary-600">
                    {getSelectedEvidenceType()?.name}
                  </span>
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
              onFileRemove={handleFileRemove}
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

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  {analysisStatus === "pending"
                    ? "Uploading Document..."
                    : analysisStatus === "processing"
                    ? "Analyzing Your Document"
                    : "Processing..."}
                </h3>
                <p className="text-gray-600">
                  {analysisStatus === "pending"
                    ? "Uploading your document and preparing for analysis..."
                    : analysisStatus === "processing"
                    ? "Our AI agent is carefully reviewing your document and preparing detailed feedback, please don't refresh the page or switch tabs... The estimated time for analysis is 3-5 minutes."
                    : "Please wait while we process your request..."}
                </p>
                {analysisStatus && (
                  <div className="mt-4 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm inline-block">
                    Status: {analysisStatus}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results */}
        <AnimatePresence>
          {(() => {
            console.log(
              "Rendering results section, analysisResult:",
              analysisResult
            );
            return analysisResult && analysisResult.status === "completed";
          })() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Analysis Results Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Analysis Completed
                  </h3>
                  <p className="text-gray-600">
                    Your document has been analyzed based on professional
                    standards.
                    <br />
                    You can always view it in the <strong>
                      Dashboard
                    </strong>{" "}
                    page.
                  </p>
                </div>

                {/* Analysis Text Display */}
                {analysisResult?.analysis_result && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <FileText className="h-6 w-6 text-gray-600 mr-3" />
                      <h4 className="text-lg font-semibold text-gray-900">
                        Detailed Analysis Results
                      </h4>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed bg-white p-4 rounded border">
                        {(() => {
                          // Parse and format the Python dict string
                          if (analysisResult.analysis_text) {
                            return analysisResult.analysis_text;
                          }
                          if (analysisResult.analysis_result) {
                            // Extract the analysis content from the Python dict string
                            const analysisString =
                              analysisResult.analysis_result;
                            const analysisMatch = analysisString.match(
                              /'analysis':\s*'(.*?)',\s*'format'/s
                            );

                            if (analysisMatch) {
                              // Clean up the extracted analysis text
                              return analysisMatch[1]
                                .replace(/\\n/g, "\n") // Convert \\n to actual line breaks
                                .replace(/\\'/g, "'") // Convert \' to '
                                .replace(/\*\*/g, "") // Remove markdown bold **
                                .replace(/### /g, "") // Remove markdown headers ###
                                .replace(/#### /g, "") // Remove markdown headers ####
                                .replace(/---/g, "\n" + "=".repeat(50) + "\n") // Replace --- with visual divider
                                .replace(/\n\s+/g, "\n") // Clean up indented lines
                                .replace(/\n{3,}/g, "\n\n") // Limit consecutive line breaks
                                .trim();
                            }
                            return analysisString;
                          }
                          return "No analysis text available";
                        })()}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Strengths */}
              {analysisResult?.strengths &&
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
              {analysisResult?.improvements &&
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
              {analysisResult?.recommendations &&
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
