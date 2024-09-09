import axios from "axios";
import { SERVER_URL } from "@/lib/variables";

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user", error);
    return null;
  }
};
