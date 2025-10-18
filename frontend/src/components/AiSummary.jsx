// frontend/src/components/AiSummary.jsx
import { useState } from "react";
import { Brain, Languages, TrendingUp, AlertCircle, HelpCircle, Apple, Activity } from "lucide-react";

const AiSummary = ({ insight }) => {
  const [language, setLanguage] = useState("english");

  const getStatusColor = (status) => {
    const colors = {
      normal: "bg-green-100 text-green-800",
      high: "bg-yellow-100 text-yellow-800",
      low: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    };
    return colors[status] || colors.normal;
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Language Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <button
          onClick={() => setLanguage(language === "english" ? "urdu" : "english")}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
        >
          <Languages className="h-5 w-5" />
          <span>{language === "english" ? "Roman Urdu mein dekhein" : "Switch to English"}</span>
        </button>
      </div>

      {/* Health Score */}
      {insight.healthScore && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Health Score</h3>
            <div className={`text-5xl font-bold ${getHealthScoreColor(insight.healthScore)}`}>
              {insight.healthScore}
              <span className="text-2xl">/100</span>
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${
                  insight.healthScore >= 80
                    ? "bg-green-500"
                    : insight.healthScore >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${insight.healthScore}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {language === "english" ? insight.summaryEnglish : insight.summaryUrdu}
        </p>
      </div>

      {/* Key Findings */}
      {insight.keyFindings && insight.keyFindings.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Key Findings</h3>
          </div>
          <div className="space-y-3">
            {insight.keyFindings.map((finding, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{finding.parameter}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                    {finding.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                  <div>
                    <span className="text-gray-600">Value:</span>
                    <span className="ml-2 font-medium text-gray-900">{finding.value}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Normal:</span>
                    <span className="ml-2 font-medium text-gray-900">{finding.normalRange}</span>
                  </div>
                </div>
                {finding.explanation && (
                  <p className="text-sm text-gray-600 mt-2">{finding.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {insight.recommendations && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {(language === "english"
              ? insight.recommendations.english
              : insight.recommendations.urdu
            ).map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Doctor Questions */}
      {insight.doctorQuestions && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Questions for Doctor</h3>
          </div>
          <ul className="space-y-2">
            {(language === "english"
              ? insight.doctorQuestions.english
              : insight.doctorQuestions.urdu
            ).map((question, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-orange-600 mt-1">?</span>
                <span className="text-gray-700">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {insight.suggestions && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Apple className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Health Suggestions</h3>
          </div>

          {insight.suggestions.foods && insight.suggestions.foods.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">🍎 Foods</h4>
              <ul className="space-y-1">
                {insight.suggestions.foods.map((food, index) => (
                  <li key={index} className="text-sm text-gray-700 ml-4">• {food}</li>
                ))}
              </ul>
            </div>
          )}

          {insight.suggestions.lifestyle && insight.suggestions.lifestyle.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">🏃 Lifestyle</h4>
              <ul className="space-y-1">
                {insight.suggestions.lifestyle.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-700 ml-4">• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          {insight.suggestions.precautions && insight.suggestions.precautions.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">⚠️ Precautions</h4>
              <ul className="space-y-1">
                {insight.suggestions.precautions.map((precaution, index) => (
                  <li key={index} className="text-sm text-gray-700 ml-4">• {precaution}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-xs text-yellow-800">
          <strong>Disclaimer:</strong> {insight.disclaimer || "This AI analysis is for informational purposes only and should not replace professional medical advice."}
        </p>
      </div>
    </div>
  );
};

export default AiSummary;