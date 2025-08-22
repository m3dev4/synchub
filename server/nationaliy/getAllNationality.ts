"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const allNationalities = async () => {
  try {
    const nationalities = await prisma.nationality.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return nationalities;
  } catch (error) {
    console.error("Error lors de la recupereation des pays");
    throw Error;
  }
};
