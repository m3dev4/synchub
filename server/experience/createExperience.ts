"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { Experience } from "@/types/experiences";

const prisma = new PrismaClient();

export const createExperience = async (data: Experience) => {
  try {
    // Validate and convert dates
    const startDate = data.startDate ? new Date(data.startDate) : undefined;
    const endDate = data.endDate ? new Date(data.endDate) : undefined;

    // Check if dates are valid when provided
    if (startDate && isNaN(startDate.getTime())) {
      throw new Error("Invalid startDate provided");
    }
    if (endDate && isNaN(endDate.getTime())) {
      throw new Error("Invalid endDate provided");
    }

    const experience = await prisma.experience.create({
      data: {
        title: data.title,
        company: data.company || "",
        startDate: startDate,
        endDate: endDate,
        current: data.current || false,
        userId: data.userId,
      },
    });
    return experience;
  } catch (error) {
    console.error("Erreur lors du creation d'experience", error);
    return Error;
  }
};
