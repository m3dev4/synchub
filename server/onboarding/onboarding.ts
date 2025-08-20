"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { UserOnboarding } from "@/types/onboarding";
import { Session } from "@/types/session";

const prisma = new PrismaClient();

export const onboarding = async (data: UserOnboarding, userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.onboarding) {
      return { success: false, message: "User already onboarding" };
    }

    // Update user data
    const updateUser = await prisma.user.update({
      where: { id: userId },
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
        onboarding: true,
      },
      include: {
        nationality: true,
        experiences: true,
        educations: true,
        session: true,
        userSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    // Create UserSkill relations if skills are provided
    if (data.skills && data.skills.length > 0) {
      // First, delete existing UserSkills for this user to avoid duplicates
      await prisma.userSkill.deleteMany({
        where: {
          userId: userId,
        },
      });

      // Then create new UserSkill relations
      await Promise.all(
        data.skills.map((skill) =>
          prisma.userSkill.create({
            data: {
              userId: userId,
              skillId: skill.skillId,
              level: skill.level || "BEGINNER",
            },
          }),
        ),
      );
    }

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
