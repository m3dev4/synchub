import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom ne doit pas dépasser 100 caractères")
    .regex(
      /^[a-zA-Z0-9\s-]+$/, // ✅ FIX: Autoriser les espaces et tirets
      "Le nom ne doit contenir que des lettres, chiffres, espaces et tirets",
    ),
  description: z.string().optional(),
  avatarUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  bannerUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  categoryId: z.string().min(1, "La catégorie est requise"),
  isPrivate: z.boolean().optional().default(false),
  customLink: z
    .string()
    .min(3, "Le lien personnalisé doit contenir au moins 3 caractères")
    .max(50, "Le lien personnalisé ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Le lien ne peut contenir que des lettres, chiffres, tirets et underscores",
    )
    .optional(), // ✅ Optionnel, sera généré automatiquement si non fourni
});

export type createCommunityInput = z.infer<typeof createCommunitySchema>;
