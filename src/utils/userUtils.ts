import { User } from "@/hooks/useUserStore";

export const storeUserData = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUserData = () => {
  localStorage.removeItem("user");
};
