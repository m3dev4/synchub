"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const getNationalityById = async (id: string) => {
  try {
    const nationality = await prisma.nationality.findUnique({
      where: {
        id: id,
      },
    });
    return nationality;
  } catch (error) {
    console.error("Error lors de la récupération du pays par ID:", error);
    return null;
  }
};
