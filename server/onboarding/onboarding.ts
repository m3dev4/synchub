"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { UserOnboarding } from "@/types/onboarding";
import { Session } from "@/types/session";

const prisma = new PrismaClient();

export const onboarding = async (data: UserOnboarding) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.onboarding) {
      return { success: false, message: "User already onboarding" };
    }

    const updateUser = await prisma.user.update({
      where: { id: data.userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        avatarPicture: data.avatarPicture,
        nationalityId: data.nationalityId,
        description: data.description,
        title: data.title,
        titleProfession: data.titleProfession,
        linkWebsite: data.linkWebsite,
        dateBirth: data.dateBirth,
      },
      include: {
        nationality: true,
        experiences: true,
        educations: true,
        session: true,
      },
    });

    return {
      success: true,
      message: "User onboarding successfully",
      user: updateUser,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "User onboarding failed" };
  }
};
