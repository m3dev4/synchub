"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const AllExperiences = async () => {
  try {
    const experiences = await prisma.experience.findMany();
    return experiences;
  } catch (error) {
    console.error("Error lors du récuperation des exepriences");
  }
};
