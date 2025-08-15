"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    if (!token || !newPassword) {
      throw new Error("Token or new password is required");
    }
    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
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
    const hashedPassword = await bcrypt.hash(newPassword, salt);

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
