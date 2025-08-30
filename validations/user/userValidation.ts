import { z } from "zod";

export const userUpdateSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .optional()
    .or(z.literal("")),
  username: z
    .string()
    .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères")
    .optional()
    .or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  title: z.string().optional().or(z.literal("")),
  titleProfession: z.string().optional().or(z.literal("")),
  linkWebsite: z.string().optional().or(z.literal("")),
  nationalityId: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  socialLinks: z.string().optional().or(z.literal("")),
});

export type userUpdateSchemaType = z.infer<typeof userUpdateSchema>;
