import axios from "axios";
import { SERVER_URL } from "@/lib/variables";

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/auth/me`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};
