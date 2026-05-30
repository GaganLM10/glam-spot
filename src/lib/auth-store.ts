import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  initialized: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  initialized: false,
  setAuth: (user, accessToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    }
    set({ user, accessToken, initialized: true });
  },
  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
    set({ user: null, accessToken: null, initialized: true });
  },
  initialize: () => {
    if (typeof window === "undefined") return;
    try {
      const userStr = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");
      if (userStr && accessToken) {
        set({
          user: JSON.parse(userStr),
          accessToken,
          initialized: true,
        });
      } else {
        set({ initialized: true });
      }
    } catch (e) {
      console.error("Failed to restore session", e);
      set({ initialized: true });
    }
  },
}));
