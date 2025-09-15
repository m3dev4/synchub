"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const getCategoryCommunity = async (communityId: string) => {
  try {
    const foundCommunity = await prisma.community.findUnique({
      where: { id: communityId },
      include: {
        category: true,
      },
    });

    if (!foundCommunity) {
      throw new Error("Community not found");
    }

    const category = await prisma.communityTags.findUnique({
      where: { id: foundCommunity.categoryId },
      include: {
        communities: true,
      },
    });

    return category;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
};
