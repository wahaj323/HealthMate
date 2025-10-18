// frontend/src/components/ReportCard.jsx
import { Link } from "react-router-dom";
import { FileText, Calendar, Hospital, User as UserIcon, CheckCircle } from "lucide-react";

const ReportCard = ({ report }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReportTypeLabel = (type) => {
    const types = {
      blood_test: "Blood Test",
      x_ray: "X-Ray",
      mri: "MRI Scan",
      ct_scan: "CT Scan",
      ultrasound: "Ultrasound",
      prescription: "Prescription",
      other: "Medical Report",
    };
    return types[type] || "Medical Report";
  };

  const getReportTypeColor = (type) => {
    const colors = {
      blood_test: "bg-red-100 text-red-700",
      x_ray: "bg-blue-100 text-blue-700",
      mri: "bg-purple-100 text-purple-700",
      ct_scan: "bg-indigo-100 text-indigo-700",
      ultrasound: "bg-green-100 text-green-700",
      prescription: "bg-yellow-100 text-yellow-700",
      other: "bg-gray-100 text-gray-700",
    };
    return colors[type] || colors.other;
  };

  return (
    <Link
      to={`/report/${report._id}`}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">{report.title}</h3>
        </div>
        {report.aiAnalyzed && (
          <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <CheckCircle className="h-3 w-3" />
            <span>AI Analyzed</span>
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className={`px-2 py-1 rounded ${getReportTypeColor(report.reportType)}`}>
            {getReportTypeLabel(report.reportType)}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(report.reportDate)}</span>
        </div>

        {report.hospitalName && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Hospital className="h-4 w-4" />
            <span>{report.hospitalName}</span>
          </div>
        )}

        {report.doctorName && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <UserIcon className="h-4 w-4" />
            <span>Dr. {report.doctorName}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
};

export default ReportCard;