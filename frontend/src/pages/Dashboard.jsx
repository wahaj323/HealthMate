// frontend/src/pages/Dashboard.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useReportStore } from "../store/useReportStore";
import { useVitalsStore } from "../store/useVitalsStore";
import { Upload, FileText, Activity, Calendar, TrendingUp } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ReportCard from "../components/ReportCard";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { reports, isLoading, fetchReports } = useReportStore();
  const { vitalsStats, fetchVitalsStats } = useVitalsStore();

  useEffect(() => {
    fetchReports();
    fetchVitalsStats(30);
  }, [fetchReports, fetchVitalsStats]);

  const recentReports = reports.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Aapke sehat ke dashboard mein khush aamdeed
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QuickActionCard
            to="/upload"
            icon={<Upload className="h-8 w-8" />}
            title="Upload Report"
            description="Add new medical report"
            urdu="Nayi report upload karein"
            color="blue"
          />
          <QuickActionCard
            to="/add-vitals"
            icon={<Activity className="h-8 w-8" />}
            title="Add Vitals"
            description="Record BP, Sugar, Weight"
            urdu="BP, Sugar record karein"
            color="green"
          />
          <QuickActionCard
            to="/timeline"
            icon={<Calendar className="h-8 w-8" />}
            title="View Timeline"
            description="See all health records"
            urdu="Sab records dekhein"
            color="purple"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Reports"
            value={reports.length}
            icon={<FileText className="h-6 w-6" />}
            color="blue"
          />
          <StatCard
            title="AI Analyzed"
            value={reports.filter(r => r.aiAnalyzed).length}
            icon={<TrendingUp className="h-6 w-6" />}
            color="green"
          />
          <StatCard
            title="Vitals Records"
            value={vitalsStats?.totalRecords || 0}
            icon={<Activity className="h-6 w-6" />}
            color="purple"
          />
        </div>

        {/* Vitals Overview */}
        {vitalsStats?.averages && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              30-Day Vitals Average
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vitalsStats.averages.bloodPressure && (
                <VitalDisplay
                  label="Blood Pressure"
                  value={`${vitalsStats.averages.bloodPressure.systolic}/${vitalsStats.averages.bloodPressure.diastolic}`}
                  unit="mmHg"
                  urdu="BP Average"
                />
              )}
              {vitalsStats.averages.bloodSugar && (
                <VitalDisplay
                  label="Blood Sugar"
                  value={vitalsStats.averages.bloodSugar}
                  unit="mg/dL"
                  urdu="Sugar Average"
                />
              )}
              {vitalsStats.averages.weight && (
                <VitalDisplay
                  label="Weight"
                  value={vitalsStats.averages.weight}
                  unit="kg"
                  urdu="Weight Average"
                />
              )}
            </div>
          </div>
        )}

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
            <Link
              to="/timeline"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : recentReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentReports.map((report) => (
                <ReportCard key={report._id} report={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reports yet
              </h3>
              <p className="text-gray-600 mb-4">
                Abhi tak koi report nahi hai
              </p>
              <Link
                to="/upload"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Upload Your First Report
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ to, icon, title, description, urdu, color }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
  };

  return (
    <Link
      to={to}
      className={`bg-gradient-to-r ${colors[color]} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1`}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
      <p className="text-xs opacity-75 mt-1 italic">{urdu}</p>
    </Link>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

const VitalDisplay = ({ label, value, unit, urdu }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-sm text-blue-600 italic">{urdu}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">
        {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
      </p>
    </div>
  );
};

export default Dashboard;