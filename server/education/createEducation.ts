"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { Education } from "@/types/educations";

const prisma = new PrismaClient();

export const createEducation = async (data: Education) => {
  try {
    const startDate = data.startDate ? new Date(data.startDate) : undefined;
    const endDate = data.endDate ? new Date(data.endDate) : undefined;

    // Check if dates are valid when provided
    if (startDate && isNaN(startDate.getTime())) {
      throw new Error("Invalid startDate provided");
    }
    if (endDate && isNaN(endDate.getTime())) {
      throw new Error("Invalid endDate provided");
    }

    const educations = await prisma.education.create({
      data: {
        title: data.title,
        school: data.school,
        startDate: startDate,
        endDate: endDate,
        current: data.current || false,
        userId: data.userId,
      },
    });
    return educations;
  } catch (error) {
    console.error("Erreur lors du création d'éducation", error);
    throw Error;
  }
};
