"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const GetSession = async (userId: string) => {
  try {
    const userConnect = await prisma.session.findMany({
      where: { userId: userId },
    });

    if (!userId) {
      throw new Error("User not found");
    }

    return userConnect;
  } catch (error: any) {
    throw new Error(
      error.message ||
        "Une erreur est survenue lors du récuperation des sessions",
    );
  }
};
