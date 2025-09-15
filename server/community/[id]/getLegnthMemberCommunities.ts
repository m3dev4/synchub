"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const getLegnthMemberCommunities = async (communityId: string) => {
  try {
    const foundCommunity = await prisma.community.findUnique({
      where: { id: communityId },
    });

    if (!foundCommunity) {
      throw new Error("Community not found");
    }
    const members = await prisma.communityMember.findMany({
      where: { communityId: communityId },
      include: {
        user: true,
      },
    });
    return members.length;
  } catch (error) {
    console.error("Error getting members:", error);
    throw error;
  }
};
