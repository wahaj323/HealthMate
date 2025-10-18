import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useVitalsStore = create((set) => ({
  vitals: [],
  vitalsStats: null,
  isLoading: false,
  isAdding: false,

  fetchVitals: async (limit = 50) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/vitals?limit=${limit}`);
      set({ vitals: res.data });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch vitals";
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  addVitals: async (vitalsData) => {
    set({ isAdding: true });
    try {
      const res = await axiosInstance.post("/vitals", vitalsData);
      set((state) => ({
        vitals: [res.data.vitals, ...state.vitals],
      }));
      toast.success("Vitals added successfully!");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add vitals";
      toast.error(message);
      return false;
    } finally {
      set({ isAdding: false });
    }
  },

  fetchVitalsStats: async (days = 30) => {
    try {
      const res = await axiosInstance.get(`/vitals/stats?days=${days}`);
      set({ vitalsStats: res.data });
    } catch (error) {
      console.error("Failed to fetch vitals stats:", error);
    }
  },

  deleteVitals: async (id) => {
    try {
      await axiosInstance.delete(`/vitals/${id}`);
      set((state) => ({
        vitals: state.vitals.filter((v) => v._id !== id),
      }));
      toast.success("Vitals deleted successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete vitals";
      toast.error(message);
    }
  },
}));