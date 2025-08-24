"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { CreateExperienceData } from "@/types/experiences";

const prisma = new PrismaClient();

export const createExperience = async (data: CreateExperienceData) => {
  try {
    const experience = await prisma.experience.create({
      data: {
        title: data.title,
        company: data.company || "",
        startDate: data.startDate,
        endDate: data.endDate,
        current: data.current,
        userId: data.userId,
      },
    });
    return experience;
  } catch (error) {
    console.error("Erreur lors du creation d'experience", error);
    throw error;
  }
};
