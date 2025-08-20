"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const AllEducations = async () => {
  try {
    const educations = await prisma.education.findMany();
    return educations;
  } catch (error) {
    console.error("Erreur lors du récuperations de listes d'éducation");
    throw Error;
  }
};
