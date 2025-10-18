// frontend/src/pages/Timeline.jsx
import { useEffect, useState } from "react";
import { useReportStore } from "../store/useReportStore";
import { useVitalsStore } from "../store/useVitalsStore";
import { Calendar, FileText, Activity } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ReportCard from "../components/ReportCard";
import VitalCard from "../components/VitalCard";

const Timeline = () => {
  const { reports, isLoading: reportsLoading, fetchReports } = useReportStore();
  const { vitals, isLoading: vitalsLoading, fetchVitals } = useVitalsStore();
  const [filter, setFilter] = useState("all");
  const [timelineItems, setTimelineItems] = useState([]);

  useEffect(() => {
    fetchReports();
    fetchVitals(100);
  }, [fetchReports, fetchVitals]);

  useEffect(() => {
    // Combine reports and vitals into timeline
    const combined = [];

    if (filter === "all" || filter === "reports") {
      reports.forEach((report) => {
        combined.push({
          type: "report",
          date: new Date(report.reportDate),
          data: report,
        });
      });
    }

    if (filter === "all" || filter === "vitals") {
      vitals.forEach((vital) => {
        combined.push({
          type: "vital",
          date: new Date(vital.date),
          data: vital,
        });
      });
    }

    // Sort by date (newest first)
    combined.sort((a, b) => b.date - a.date);
    setTimelineItems(combined);
  }, [reports, vitals, filter]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const groupByMonth = (items) => {
    const grouped = {};
    items.forEach((item) => {
      const monthKey = item.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(item);
    });
    return grouped;
  };

  const groupedItems = groupByMonth(timelineItems);

  if (reportsLoading || vitalsLoading) {
    return <LoadingSpinner fullScreen message="Loading timeline..." />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-blue-600" />
            Health Timeline
          </h1>
          <p className="text-gray-600 mt-2">Apki sehat ki complete timeline</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 px-4 py-2 rounded-lg transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("reports")}
            className={`flex-1 px-4 py-2 rounded-lg transition flex items-center justify-center ${
              filter === "reports"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText className="h-4 w-4 mr-2" />
            Reports ({reports.length})
          </button>
          <button
            onClick={() => setFilter("vitals")}
            className={`flex-1 px-4 py-2 rounded-lg transition flex items-center justify-center ${
              filter === "vitals"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Activity className="h-4 w-4 mr-2" />
            Vitals ({vitals.length})
          </button>
        </div>

        {/* Timeline */}
        {timelineItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No records found
            </h3>
            <p className="text-gray-600">Abhi tak koi record nahi hai</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedItems).map(([month, items]) => (
              <div key={month}>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    {month}
                  </div>
                  <div className="flex-1 h-px bg-gray-300 ml-4"></div>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="relative pl-8">
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-0 top-6 w-4 h-4 rounded-full ${
                          item.type === "report"
                            ? "bg-blue-600"
                            : "bg-green-600"
                        }`}
                      ></div>

                      {/* Timeline line */}
                      {index < items.length - 1 && (
                        <div className="absolute left-2 top-10 bottom-0 w-px bg-gray-300"></div>
                      )}

                      {/* Content */}
                      <div className="mb-2">
                        <span className="text-sm text-gray-600">
                          {formatDate(item.date)}
                        </span>
                      </div>

                      {item.type === "report" ? (
                        <ReportCard report={item.data} />
                      ) : (
                        <VitalCard vital={item.data} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;