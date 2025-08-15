"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

/**
 * Verifies a user's email by checking the provided token.
 *
 * @param {string} token - The token associated with the user's email verification.
 * @returns {Promise<object>} The updated user object with verification status.
 * @throws Will throw an error if the user is not found or if the email verification fails.
 */

const prisma = new PrismaClient();
export const verifyEmail = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerify: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
      },
    });

    return updateUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to verify email");
  }
};
