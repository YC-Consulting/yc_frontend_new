import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileText,
  Clock,
  TrendingUp,
  Download,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  Brain,
  Calendar,
  Award,
  Newspaper,
  Users,
  Medal,
  RefreshCw,
  X,
} from "lucide-react";
import api from "@/utils/api";
import { formatFileSize } from "@/utils/format";

interface Document {
  id: string;
  name: string;
  type: string;
  route: string;
  created_time: string;
  updated_time: string;
  file?: {
    download_url?: string;
    view_url?: string;
    filename?: string;
    size?: number;
  };
}

interface Analysis {
  id: string;
  document_id: string;
  document_name?: string;
  status: string;
  analysis_result?: string;
  score?: number;
  strengths?: string[];
  improvements?: string[];
  recommendations?: string[];
  error_message?: string;
  created_time: string;
  started_time?: string;
  completed_time?: string;
  updated_time: string;
  analysis_text?: string;
  format?: string;
  note?: string;
}

const getDocumentTypeIcon = (type: string) => {
  switch (type) {
    case "cv":
      return FileText;
    case "media_coverage":
      return Newspaper;
    case "evidence_of_appearance":
      return Users;
    case "reference_letter":
      return Award;
    case "awards_and_recognition":
      return Medal;
    default:
      return FileText;
  }
};

const getRouteDisplayName = (route: string) => {
  switch (route) {
    case "visual_art":
      return "Visual Art";
    case "combined_art":
      return "Combined Art";
    default:
      return route;
  }
};

const getTypeDisplayName = (type: string) => {
  switch (type) {
    case "cv":
      return "CV";
    case "media_coverage":
      return "Media Coverage";
    case "evidence_of_appearance":
      return "Evidence of Appearance";
    case "reference_letter":
      return "Reference Letter";
    case "awards_and_recognition":
      return "Awards and Recognition";
    default:
      return type;
  }
};

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [analyses, setAnalyses] = useState<{ [key: string]: Analysis }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(
    null
  );
  const [cacheExpiry] = useState<number>(5 * 60 * 1000); // 5 minutes cache

  // Persistent cache using localStorage
  const getCacheFromStorage = () => {
    try {
      const cached = localStorage.getItem("dashboard_cache");
      return cached
        ? JSON.parse(cached)
        : { documents: [], analyses: {}, lastFetchTime: 0 };
    } catch {
      return { documents: [], analyses: {}, lastFetchTime: 0 };
    }
  };

  const saveCacheToStorage = (
    documents: Document[],
    analyses: { [key: string]: Analysis }
  ) => {
    try {
      const cacheData = {
        documents,
        analyses,
        lastFetchTime: Date.now(),
      };
      localStorage.setItem("dashboard_cache", JSON.stringify(cacheData));
    } catch (error) {
      console.log("Failed to save cache to localStorage:", error);
    }
  };

  const fetchDocuments = async (forceRefresh: boolean = false) => {
    const now = Date.now();
    const cachedData = getCacheFromStorage();

    // Check if we have valid cached data
    const isCacheValid =
      !forceRefresh &&
      now - cachedData.lastFetchTime < cacheExpiry &&
      cachedData.documents.length > 0;

    if (isCacheValid) {
      console.log("Using cached data from localStorage");
      setDocuments(cachedData.documents);
      setAnalyses(cachedData.analyses);
      setIsLoading(false);
      return;
    }

    console.log("Fetching fresh data from API");
    setIsLoading(true);
    try {
      const response = await api.get("/website/document/get");
      setDocuments(response.data.documents);

      // Fetch analyses for each document with caching
      const analysisPromises = response.data.documents.map(
        async (doc: Document) => {
          // Check localStorage cache first
          const cachedAnalysis = cachedData.analyses[doc.id];
          if (cachedAnalysis && !forceRefresh) {
            console.log(`Using cached analysis for ${doc.name}`);
            return {
              documentId: doc.id,
              analysis: cachedAnalysis,
            };
          }

          try {
            console.log(`Fetching fresh analysis for ${doc.name}`);
            const analysisResponse = await api.get(
              `/website/document/analysis/get?document_id=${doc.id}`
            );
            console.log(`Analysis for ${doc.name}:`, analysisResponse.data);

            let analysisData = analysisResponse.data.analysis;

            // Parse the analysis_result if it's a JSON string
            if (analysisData && analysisData.analysis_result) {
              try {
                const parsedResult = JSON.parse(analysisData.analysis_result);
                console.log(
                  `Parsed analysis_result for ${doc.name}:`,
                  parsedResult
                );

                // Handle the nested structure where actual analysis is in parsedResult.analysis
                if (parsedResult.analysis) {
                  // Extract score from the text analysis
                  const analysisText = parsedResult.analysis;
                  // Try multiple regex patterns to extract the score
                  const scoreMatch =
                    analysisText.match(/\*\*总体评分：(\d+)\/5\*\*/) ||
                    analysisText.match(/总体评分：(\d+)\/5/) ||
                    analysisText.match(/评分：(\d+)\/5/);
                  const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
                  console.log(
                    `Extracted score for ${doc.name}:`,
                    score,
                    "from match:",
                    scoreMatch
                  );

                  // Create a structured analysis object
                  analysisData = {
                    ...analysisData,
                    score: score,
                    summary: analysisText,
                    analysis_text: analysisText,
                    format: parsedResult.format,
                    note: parsedResult.note,
                  };
                } else {
                  // Fallback for other formats
                  analysisData = { ...analysisData, ...parsedResult };
                }
                console.log(
                  `Final analysis data for ${doc.name}:`,
                  analysisData
                );
              } catch (error) {
                console.log("Failed to parse analysis_result JSON:", error);
              }
            }

            // Analysis data will be cached when we save to localStorage below

            return {
              documentId: doc.id,
              analysis: analysisData,
            };
          } catch (error) {
            console.log(`No analysis found for ${doc.name}:`, error);
            // Document might not have analysis yet
            return { documentId: doc.id, analysis: null };
          }
        }
      );

      const analysisResults = await Promise.all(analysisPromises);
      const analysisMap: { [key: string]: Analysis } = {};
      analysisResults.forEach((result) => {
        if (result.analysis) {
          analysisMap[result.documentId] = result.analysis;
        }
      });
      console.log("Final analysis map:", analysisMap);
      setAnalyses(analysisMap);

      // Save to localStorage cache
      saveCacheToStorage(response.data.documents, analysisMap);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  const showDeleteConfirm = (document: Document) => {
    setDocumentToDelete(document);
    setDeleteConfirmOpen(true);
  };

  const deleteDocument = async () => {
    if (!documentToDelete) return;

    try {
      await api.post(`/website/document/delete?id=${documentToDelete.id}`);
      const updatedDocuments = documents.filter(
        (doc) => doc.id !== documentToDelete.id
      );
      const newAnalyses = { ...analyses };
      delete newAnalyses[documentToDelete.id];

      setDocuments(updatedDocuments);
      setAnalyses(newAnalyses);

      // Update localStorage cache
      saveCacheToStorage(updatedDocuments, newAnalyses);

      // Close confirmation dialog
      setDeleteConfirmOpen(false);
      setDocumentToDelete(null);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to delete document");
      setDeleteConfirmOpen(false);
      setDocumentToDelete(null);
    }
  };

  const downloadDocument = (document: Document) => {
    if (document.file?.download_url) {
      window.open(document.file.download_url, "_blank");
    }
  };

  const openDocument = (document: Document) => {
    // Use view_url if available, otherwise fall back to download_url
    const urlToOpen = document.file?.view_url || document.file?.download_url;

    if (urlToOpen) {
      window.open(urlToOpen, "_blank");
    }
  };

  const viewAnalysis = (document: Document) => {
    setSelectedDocument(document);
    setSelectedAnalysis(analyses[document.id] || null);
  };

  const calculateStats = () => {
    const completedAnalyses = Object.values(analyses).filter(
      (a) => a.status === "completed"
    );
    const analysesWithScores = completedAnalyses.filter(
      (a) => a.score && a.score > 0
    );
    console.log("Completed analyses for stats:", completedAnalyses);
    console.log("Analyses with scores:", analysesWithScores);

    const totalDocs = documents.length;
    const avgScore =
      analysesWithScores.length > 0
        ? Math.round(
            analysesWithScores.reduce((sum, a) => sum + (a.score || 0), 0) /
              analysesWithScores.length
          )
        : 0;
    console.log("Calculated average score:", avgScore);
    const timeSaved = totalDocs * 2; // Assume 2 hours saved per document

    return { totalDocs, avgScore, timeSaved };
  };

  useEffect(() => {
    // Try to load from cache first, then fetch if needed
    const cachedData = getCacheFromStorage();
    const now = Date.now();

    if (
      cachedData.documents.length > 0 &&
      now - cachedData.lastFetchTime < cacheExpiry
    ) {
      console.log("Loading cached data on mount");
      setDocuments(cachedData.documents);
      setAnalyses(cachedData.analyses);
      setIsLoading(false);
    } else {
      console.log("No valid cache, fetching fresh data");
      fetchDocuments();
    }
  }, []);

  const stats = calculateStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your documents...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Track your document analysis history and view your progress.
          </p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
              <button
                onClick={() => {
                  setError("");
                  fetchDocuments();
                }}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalDocs}
            </div>
            <p className="text-sm text-gray-600">Total documents uploaded</p>
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
            <div className="text-3xl font-bold text-gray-900">
              {stats.avgScore}
            </div>
            <p className="text-sm text-gray-600">Across analyzed documents</p>
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
            <div className="text-3xl font-bold text-gray-900">
              {stats.timeSaved}h
            </div>
            <p className="text-sm text-gray-600">Using AI analysis</p>
          </motion.div>
        </div>

        {/* Documents List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Documents
            </h2>
            <button
              onClick={() => fetchDocuments(true)}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Documents Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Upload your first document to get started with AI analysis.
              </p>
              <a
                href="/document-analysis"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Upload Document</span>
              </a>
            </div>
          ) : (
            <div className="grid gap-6">
              {documents.map((document, index) => {
                const analysis = analyses[document.id];
                const IconComponent = getDocumentTypeIcon(document.type);

                return (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border border-gray-200 rounded-lg p-6 transition-all ${
                      document.file?.view_url || document.file?.download_url
                        ? "hover:shadow-md hover:border-primary-300 cursor-pointer"
                        : "hover:shadow-md"
                    }`}
                    onClick={() =>
                      (document.file?.view_url ||
                        document.file?.download_url) &&
                      openDocument(document)
                    }
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <IconComponent className="h-8 w-8 text-primary-600 mt-1" />
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-lg font-semibold truncate ${
                              document.file?.view_url ||
                              document.file?.download_url
                                ? "text-primary-600 hover:text-primary-800"
                                : "text-gray-900"
                            }`}
                          >
                            {document.name}
                            {(document.file?.view_url ||
                              document.file?.download_url) && (
                              <span className="ml-2 text-xs text-gray-500"></span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {getRouteDisplayName(document.route)}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                              {getTypeDisplayName(document.type)}
                            </span>
                            {document.file?.size && (
                              <span>{formatFileSize(document.file.size)}</span>
                            )}
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(
                                document.created_time
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Analysis Status */}
                          <div className="mt-3">
                            {analysis ? (
                              <div className="flex items-center space-x-4">
                                {analysis.status === "completed" && (
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-green-600">
                                      Analysis Completed
                                    </span>
                                  </div>
                                )}
                                {analysis.status === "processing" && (
                                  <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm text-primary-600">
                                      Analyzing...
                                    </span>
                                  </div>
                                )}
                                {analysis.status === "failed" && (
                                  <div className="flex items-center space-x-2">
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                    <span className="text-sm text-red-600">
                                      Analysis Failed
                                    </span>
                                  </div>
                                )}
                                {analysis.status === "pending" && (
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm text-yellow-600">
                                      Pending Analysis
                                    </span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Brain className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  No analysis available
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        {analysis && analysis.status === "completed" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              viewAnalysis(document);
                            }}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Analysis"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {document.file?.download_url && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadDocument(document);
                            }}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download Document"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            showDeleteConfirm(document);
                          }}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Analysis Modal */}
        <AnimatePresence>
          {selectedDocument && selectedAnalysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => {
                setSelectedDocument(null);
                setSelectedAnalysis(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedDocument.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getRouteDisplayName(selectedDocument.route)} •{" "}
                      {getTypeDisplayName(selectedDocument.type)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDocument(null);
                      setSelectedAnalysis(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Body - Analysis Results */}
                <div className="p-6 space-y-6">
                  {selectedAnalysis.status === "completed" && (
                    <>
                      {/* Analysis Header */}
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Document Analysis Results
                        </h4>
                        <p className="text-gray-600">
                          Analysis completed on{" "}
                          {new Date(
                            selectedAnalysis.completed_time ||
                              selectedAnalysis.updated_time
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Full Analysis Text */}
                      {(selectedAnalysis.analysis_text ||
                        selectedAnalysis.analysis_result) && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-3">
                            <FileText className="h-5 w-5 text-gray-600 mr-2" />
                            <h4 className="font-semibold text-gray-900">
                              Detailed Analysis
                            </h4>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                              {(() => {
                                // Try to parse and extract the analysis text
                                if (selectedAnalysis.analysis_text) {
                                  return selectedAnalysis.analysis_text;
                                }
                                if (selectedAnalysis.analysis_result) {
                                  // The analysis_result is a Python dict string, not JSON
                                  const analysisString =
                                    selectedAnalysis.analysis_result;

                                  // Extract the analysis content from the Python dict string
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
                                      .replace(
                                        /---/g,
                                        "\n" + "=".repeat(50) + "\n"
                                      ) // Replace --- with visual divider
                                      .replace(/\n\s+/g, "\n") // Clean up indented lines
                                      .replace(/\n{3,}/g, "\n\n") // Limit consecutive line breaks
                                      .trim();
                                  }

                                  // Fallback: try JSON parse
                                  try {
                                    const parsed = JSON.parse(analysisString);
                                    if (parsed.analysis) {
                                      return parsed.analysis
                                        .replace(/\\n/g, "\n")
                                        .replace(/\*\*/g, "")
                                        .replace(/###/g, "")
                                        .trim();
                                    }
                                  } catch {}

                                  return analysisString;
                                }
                                return "No analysis text available";
                              })()}
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Strengths */}
                      {selectedAnalysis.strengths &&
                        selectedAnalysis.strengths.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-3 mb-4">
                              <CheckCircle className="h-6 w-6 text-green-500" />
                              <h4 className="text-lg font-semibold text-gray-900">
                                Strengths
                              </h4>
                            </div>
                            <div className="space-y-2">
                              {selectedAnalysis.strengths.map(
                                (strength, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start space-x-3"
                                  >
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-700">{strength}</p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Improvements */}
                      {selectedAnalysis.improvements &&
                        selectedAnalysis.improvements.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-3 mb-4">
                              <AlertTriangle className="h-6 w-6 text-yellow-500" />
                              <h4 className="text-lg font-semibold text-gray-900">
                                Areas for Improvement
                              </h4>
                            </div>
                            <div className="space-y-2">
                              {selectedAnalysis.improvements.map(
                                (improvement, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start space-x-3"
                                  >
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-700">
                                      {improvement}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Recommendations */}
                      {selectedAnalysis.recommendations &&
                        selectedAnalysis.recommendations.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-3 mb-4">
                              <Brain className="h-6 w-6 text-blue-500" />
                              <h4 className="text-lg font-semibold text-gray-900">
                                Recommendations
                              </h4>
                            </div>
                            <div className="space-y-2">
                              {selectedAnalysis.recommendations.map(
                                (recommendation, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start space-x-3"
                                  >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-700">
                                      {recommendation}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </>
                  )}

                  {selectedAnalysis.status === "failed" && (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Analysis Failed
                      </h4>
                      <p className="text-gray-600">
                        {selectedAnalysis.error_message ||
                          "The analysis could not be completed."}
                      </p>
                    </div>
                  )}

                  {(selectedAnalysis.status === "pending" ||
                    selectedAnalysis.status === "processing") && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {selectedAnalysis.status === "pending"
                          ? "Analysis Pending"
                          : "Analysis in Progress"}
                      </h4>
                      <p className="text-gray-600">
                        {selectedAnalysis.status === "pending"
                          ? "Your document is queued for analysis."
                          : "Our AI is analyzing your document. This may take a few minutes."}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Delete Document
                      </h3>
                      <p className="text-sm text-gray-600">
                        This action cannot be undone
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">
                    Are you sure you want to delete{" "}
                    <strong>"{documentToDelete?.name}"</strong>? This will
                    permanently remove the document and its analysis results.
                  </p>

                  <div className="flex space-x-3 justify-end">
                    <button
                      onClick={() => setDeleteConfirmOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteDocument}
                      className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Delete Document
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
