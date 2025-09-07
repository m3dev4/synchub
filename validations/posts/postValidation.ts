import { z } from "zod";

export const createPostValidation = z.object({
  content: z
    .string()
    .min(1, "Le contenu est requis")
    .max(2000, "Le contenu ne peut pas dépasser 2000 caractères"),
  contentType: z
    .enum(["TEXT", "MARKDOWN", "RICH_TEXT"])
    .optional()
    .default("TEXT"),
  visibility: z
    .enum(["PUBLIC", "PRIVATE", "FOLLOWERS_ONLY"])
    .optional()
    .default("PUBLIC"),
  media: z
    .array(
      z.object({
        type: z.enum(["IMAGE", "VIDEO", "AUDIO", "DOCUMENT"]),
        url: z.string().url("URL invalide"),
        publicId: z.string().optional(),
        filename: z.string().optional(),
        size: z.number().optional(),
        duration: z.number().optional(),
      }),
    )
    .optional(),
  isCollaborative: z.boolean().optional().default(false),
  collaboratorIds: z.array(z.string()).optional(),
});

export const updatePostValidation = z.object({
  content: z
    .string()
    .min(1, "Le contenu est requis")
    .max(2000, "Le contenu ne peut pas dépasser 2000 caractères")
    .optional(),
  contentType: z.enum(["TEXT", "MARKDOWN", "RICH_TEXT"]).optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "FOLLOWERS_ONLY"]).optional(),
});

export const addCollaboratorValidation = z.object({
  userId: z.string().min(1, "ID utilisateur requis"),
  role: z.enum(["EDITOR", "CONTRIBUTOR", "VIEWER"]).default("CONTRIBUTOR"),
});

export const updateCollaboratorValidation = z.object({
  role: z.enum(["EDITOR", "CONTRIBUTOR", "VIEWER"]),
});

export type CreatePostInput = z.infer<typeof createPostValidation>;
export type UpdatePostInput = z.infer<typeof updatePostValidation>;
export type AddCollaboratorInput = z.infer<typeof addCollaboratorValidation>;
export type UpdateCollaboratorInput = z.infer<
  typeof updateCollaboratorValidation
>;
