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
    // Find user with the provided token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });

    if (!user) {
      throw new Error("Code de vérification invalide ou expiré");
    }

    // Check if token is expired
    if (
      user.emailVerificationTokenExpiresAt &&
      user.emailVerificationTokenExpiresAt < new Date()
    ) {
      throw new Error("Code de vérification expiré");
    }

    // Update user verification status
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerify: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
      },
    });

    // Créer une session après vérification email
    const { v4: uuidv4 } = await import("uuid");
    const sessionToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 jours

    await prisma.session.create({
      data: {
        userId: user.id,
        token: sessionToken,
        expiresAt: expiresAt,
        ipAddress: "",
        useAgent: "",
        isOnline: true,
        lastActivityAt: new Date(),
      },
    });

    return { ...updatedUser, sessionToken };
  } catch (error: any) {
    console.error("Erreur vérification email:", error);
    throw error; // Re-throw the original error with its message
  }
};
