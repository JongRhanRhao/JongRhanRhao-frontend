import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

import { getCurrentUser } from "@/utils/userAPI";
import { SERVER_URL } from "@/lib/variables";

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userRole: string;
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
      initializeUser: async () => {
        const userData = await getCurrentUser();
        if (userData) {
          set({ user: userData, isAuthenticated: true });
        }
      },
      logout: async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/users/auth/logout`, {
            withCredentials: true,
          });

          if (response.status === 200) {
            set({ user: null, isAuthenticated: false });
          } else {
            throw new Error(response.data.message || "Logout failed");
          }
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const useUser = () => {
  const store = useUserStore();
  return store;
};
