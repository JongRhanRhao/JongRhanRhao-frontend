import { z } from "zod";

export const BaseUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const LoginSchema = BaseUserSchema;

export const RegisterSchema = BaseUserSchema.extend({
  user_name: z.string().min(1, "Username is required"),
  phone_number: z.string().optional(), // Adjust based on your requirements
  confirm_password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});
