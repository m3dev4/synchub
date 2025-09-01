"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import bcrypt from "bcryptjs";
import { tokenSchema, passwordSchema } from "@/lib/security";

const prisma = new PrismaClient();

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    if (!token || !newPassword) {
      throw new Error("Token or new password is required");
    }

    // Validation sécurisée du token et du mot de passe
    const validatedToken = tokenSchema.parse(token);
    const validatedPassword = passwordSchema.parse(newPassword);

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: validatedToken,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (
      user.resetPasswordTokenExpiresAt &&
      user.resetPasswordTokenExpiresAt < new Date()
    ) {
      throw new Error("Token expired");
    }

    const salt = 12;
    const hashedPassword = await bcrypt.hash(validatedPassword, salt);

    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    });

    return updateUser;
  } catch (error) {
    console.error("Error lors de la reinitialisation du mot de passe", error);
    throw error;
  }
};
