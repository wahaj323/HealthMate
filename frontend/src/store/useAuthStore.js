// frontend/src/store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      toast.success(res.data.message || "Registration successful! Please login.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ user: res.data });
      toast.success("Welcome back!");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ user: res.data.user });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put("/auth/profile", profileData);
      set({ user: res.data.user });
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  changePassword: async (passwordData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.put("/auth/change-password", passwordData);
      toast.success("Password changed successfully");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Password change failed";
      toast.error(message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));