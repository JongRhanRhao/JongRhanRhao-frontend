import { z } from "zod";

export type FormData = {
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
};

export const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must not exceed 50 characters" }),
  phone_number: z.string().min(10, { message: "Invalid phone number" }),
});

export const FILTER_TYPES = {
  HOT: "Hot",
  FAVORITE: "Favorite",
  ALL: "All",
  NINETIES: "90s",
  CAFE: "Cafe",
};
