import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { getCurrentUser } from "../utils/userAPI";
import { SERVER_URL } from "@/lib/variables";

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    };

    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    fetchUser();
  }, []);

  const logout = async () => {
    axios.get(`${SERVER_URL}/users/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
