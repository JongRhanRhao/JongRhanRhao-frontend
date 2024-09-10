import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

import { getCurrentUser } from "@/utils/userAPI";
import { SERVER_URL } from "@/lib/variables";

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  role: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (status: boolean) => void;
  logout: () => Promise<void>;
  initializeUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setIsAuthenticated: (status) => set({ isAuthenticated: status }),
      logout: async () => {
        await axios.get(`${SERVER_URL}/users/auth/logout`, {
          withCredentials: true,
        });
        set({ user: null, isAuthenticated: false });
      },
      initializeUser: async () => {
        const userData = await getCurrentUser();
        if (userData) {
          set({ user: userData, isAuthenticated: true });
        }
      },
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export const useUser = () => {
  const {
    user,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    logout,
    initializeUser,
  } = useUserStore();
  return {
    user,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    logout,
    initializeUser,
  };
};
