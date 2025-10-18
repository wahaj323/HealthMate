import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useReportStore = create((set, get) => ({
  reports: [],
  currentReport: null,
  currentInsight: null,
  isUploading: false,
  isLoading: false,
  isAnalyzing: false,

  fetchReports: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/reports");
      set({ reports: res.data });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch reports";
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  uploadReport: async (formData) => {
    set({ isUploading: true });
    try {
      const res = await axiosInstance.post("/reports/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      set((state) => ({
        reports: [res.data.report, ...state.reports],
      }));
      
      toast.success("Report uploaded successfully!");
      return res.data.report;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to upload report";
      toast.error(message);
      return null;
    } finally {
      set({ isUploading: false });
    }
  },

  getReportById: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/reports/${id}`);
      set({ currentReport: res.data });
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch report";
      toast.error(message);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  analyzeReport: async (reportId) => {
    set({ isAnalyzing: true });
    try {
      const res = await axiosInstance.post(`/analysis/analyze/${reportId}`);
      set({ currentInsight: res.data.insight });
      toast.success("Report analyzed successfully!");
      
      // Update report as analyzed
      set((state) => ({
        reports: state.reports.map((r) =>
          r._id === reportId ? { ...r, aiAnalyzed: true } : r
        ),
      }));
      
      return res.data.insight;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to analyze report";
      toast.error(message);
      return null;
    } finally {
      set({ isAnalyzing: false });
    }
  },

  getReportInsight: async (reportId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/analysis/insight/${reportId}`);
      set({ currentInsight: res.data });
      return res.data;
    } catch (error) {
      // Don't show error if insight doesn't exist
      set({ currentInsight: null });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteReport: async (id) => {
    try {
      await axiosInstance.delete(`/reports/${id}`);
      set((state) => ({
        reports: state.reports.filter((r) => r._id !== id),
      }));
      toast.success("Report deleted successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete report";
      toast.error(message);
    }
  },

  clearCurrentReport: () => {
    set({ currentReport: null, currentInsight: null });
  },
}));