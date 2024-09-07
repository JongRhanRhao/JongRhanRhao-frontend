import { User } from "@/contexts/UserContext";

export const storeUserData = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUserData = () => {
  localStorage.removeItem("user");
};
