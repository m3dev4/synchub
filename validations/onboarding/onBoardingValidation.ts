import * as z from "zod";

export const onBoardingValidation = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  username: z
    .string()
    .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères"),
  dateBirth: z
    .date()
    .min(
      new Date(1900, 0, 1),
      "La date de naissance doit être supérieure ou égale à 1900",
    ),
  nationalityId: z.string().min(1, "Le pays doit être sélectionné"),
  title: z
    .string()
    .min(2, "Le titre doit contenir au moins 2 caractères")
    .optional()
    .or(z.literal("")),
  titleProfession: z
    .string()
    .min(2, "Le titre de profession doit contenir au moins 2 caractères")
    .optional()
    .or(z.literal("")),
  linkWebsite: z
    .string()
    .url("Le lien du site web doit être une URL valide")
    .optional()
    .or(z.literal("")),
  avatarPicture: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  experiences: z.array(
    z.object({
      id: z.string(),
      title: z
        .string()
        .min(2, "Le titre doit contenir au moins 2 caractères")
        .optional(),
      description: z
        .string()
        .min(2, "La description doit contenir au moins 2 caractères")
        .optional(),
      startDate: z.date(),
      endDate: z.date(),
    }),
  ),
  educations: z.array(
    z.object({
      id: z.string(),
      title: z
        .string()
        .min(2, "Le titre doit contenir au moins 2 caractères")
        .optional(),
      description: z
        .string()
        .min(2, "La description doit contenir au moins 2 caractères")
        .optional(),
      startDate: z.date(),
      endDate: z.date(),
    }),
  ),
  skills: z
    .array(
      z.object({
        skillId: z.number(),
        skillTitle: z.string(),
        sousSkillId: z.number(),
        sousSkillTitle: z.string(),
        technologyId: z.number(),
        technologyTitle: z.string(),
      }),
    )
    .optional(),
});

export type OnBoardingValidation = z.infer<typeof onBoardingValidation>;
