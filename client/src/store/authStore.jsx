import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../libs/axios";

export const useAuth = create((set, get) => ({
  authUser: null,
  setAuthUser: (user) => set({ authUser: user }),
  isCheckingAuth: true,
  isSigningUp: true,
  isLoggingIn: true,
  isGuestMode: false,
  setGuestMode: (isGuest) => set({ isGuestMode: isGuest, authUser: null }),
  checkAuth: async () => {
    try {
      if (get().isGuestMode) {
        set({ isCheckingAuth: false });
        return;
      }
      const response = await axiosInstance.get("/check");
      if (response.data) {
        set({ authUser: response.data });
      }
    } catch (error) {
      console.log("Error in checkAuth", error.response);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
      // set({ isGuestMode: false });

    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/signup", data);

      set({ authUser: res.data , isGuestMode: false});

      return { success: true, user: res.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ authUser: res.data , isGuestMode: false });

      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout");
      toast.success("Logged out successfully");
      set({ authUser: null, isGuestMode: false });
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  },
}));
