import { z } from "zod";

export const BaseUserSchema = z.object({
  email: z.string().email("* Email is required"),
  password: z.string().min(6, "* Password must be at least 6 characters long"),
});

export const LoginSchema = BaseUserSchema;

export const RegisterSchema = BaseUserSchema.extend({
  user_name: z.string().min(1, "* Username is required"),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "* Invalid phone number",
  }),
  confirm_password: z.string().min(6, "* Password is required"),
  birthYear: z.number().int().min(1900).max(new Date().getFullYear()),
}).refine((data) => data.password === data.confirm_password, {
  message: "* Passwords do not match",
  path: ["confirm_password"],
});
