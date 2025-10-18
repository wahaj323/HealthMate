// frontend/src/pages/ViewReport.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReportStore } from "../store/useReportStore";
import { Brain, FileText, Trash2, AlertCircle, Languages, Loader2 } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import AiSummary from "../components/AiSummary.jsx";

const ViewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentReport, 
    currentInsight, 
    isLoading, 
    isAnalyzing,
    getReportById, 
    getReportInsight,
    analyzeReport,
    deleteReport 
  } = useReportStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getReportById(id);
      await getReportInsight(id);
    };
    fetchData();
  }, [id, getReportById, getReportInsight]);

  const handleAnalyze = async () => {
    await analyzeReport(id);
  };

  const handleDelete = async () => {
    await deleteReport(id);
    navigate("/dashboard");
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading report..." />;
  }

  if (!currentReport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-4">Report nahi mili</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentReport.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>📅 {formatDate(currentReport.reportDate)}</span>
                {currentReport.hospitalName && (
                  <span>🏥 {currentReport.hospitalName}</span>
                )}
                {currentReport.doctorName && (
                  <span>👨‍⚕️ Dr. {currentReport.doctorName}</span>
                )}
              </div>
              {currentReport.notes && (
                <p className="mt-3 text-gray-700">{currentReport.notes}</p>
              )}
            </div>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          {/* AI Analysis Button */}
          {!currentReport.aiAnalyzed && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Brain className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Get AI Analysis
                    </h3>
                    <p className="text-sm text-gray-600">
                      AI se apni report ko samjhein - English aur Urdu mein
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" />
                      <span>Analyze Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Report Preview
              </h2>

              {currentReport.fileType === "pdf" ? (
                <div className="space-y-4">
                  <iframe
                    src={currentReport.fileUrl}
                    className="w-full h-[600px] border rounded-lg"
                    title="Report PDF"
                  />
                  <a
                    href={currentReport.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Open in New Tab
                  </a>
                </div>
              ) : (
                <img
                  src={currentReport.fileUrl}
                  alt="Report"
                  className="w-full rounded-lg"
                />
              )}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="lg:col-span-1">
            {isAnalyzing ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <LoadingSpinner message="AI analyzing your report..." />
              </div>
            ) : currentInsight ? (
              <AiSummary insight={currentInsight} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No AI Analysis Yet
                </h3>
                <p className="text-gray-600 text-sm">
                  Click "Analyze Now" to get AI-powered insights
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Delete Report?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this report? This action cannot be undone.
            </p>
            <p className="text-sm text-red-600 mb-6 italic">
              Ye report permanently delete ho jayegi
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReport;