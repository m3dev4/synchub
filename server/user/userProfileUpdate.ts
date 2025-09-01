"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { userUpdateDto } from "@/types/user";

const prisma = new PrismaClient();

export const userUpdate = async (userId: string, data: userUpdateDto) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        description: data.description,
        title: data.title,
        titleProfession: data.titleProfession,
        linkWebsite: data.linkWebsite,
        nationalityId: data.nationalityId,
        location: data.location,
        phoneNumber: data.phoneNumber,
        phoneNumberVerificationToken: data.phoneNumberVerificationToken,
        phoneNumberVerificationTokenExpiresAt:
          data.phoneNumberVerificationTokenExpiresAt,
        socialLinks: data.socialLinks ? JSON.stringify(data.socialLinks) : null,
      },
    });

    return updateUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
