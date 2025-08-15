"use server";

import { sendForgotPassword } from "@/email/resend";
import { PrismaClient } from "@/lib/prisma-client-js";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const forgotPassword = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const token = uuidv4();
    const thirtyMinutes = new Date();
    thirtyMinutes.setMinutes(thirtyMinutes.getMinutes() + 30);

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: thirtyMinutes,
      },
    });

    if (!updateUser) {
      throw new Error("User not found");
    }

    await sendForgotPassword(email, token);

    return updateUser;
  } catch (error) {
    console.error(
      "Error lors de l'envoie du mail de reinitialisation de mot de passe",
      error,
    );
    throw error;
  }
};
