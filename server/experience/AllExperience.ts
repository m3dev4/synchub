"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const AllExperiences = async () => {
  try {
    const experiences = await prisma.experience.findMany();
    return experiences;
  } catch (error) {
    console.error("Erreur lors de la récupération des expériences:", error);
    throw new Error("Impossible de récupérer les expériences");
  }
};
