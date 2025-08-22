"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const me = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        experiences: true,
        educations: true,
        degrees: true,
        session: true,
        userSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};
