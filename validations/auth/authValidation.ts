import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide")
    .min(1, "Email is required"),
  password: z
    .string()

    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const emailVerificationSchema = z.object({
  token: z.string().min(6, "Le token doit contenir au moins 6 caractères"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide")
    .min(1, "Email is required"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type createUserType = z.infer<typeof createUserSchema>;
export type loginType = z.infer<typeof loginSchema>;
export type emailVerificationType = z.infer<typeof emailVerificationSchema>;
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
