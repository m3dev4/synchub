"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const allCommunities = async (sessionToken: string) => {
  try {
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    const communities = await prisma.community.findMany();

    return communities;
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw Error;
  }
};
