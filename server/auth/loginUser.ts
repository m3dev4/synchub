/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/lib/prisma";
import { loginDto, User } from "@/types/user";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

type AuthenticatedUser = Omit<User, "password">;

export const signIn = async (
  data: loginDto,
  request: Request,
): Promise<AuthenticatedUser | null> => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
      include: {
        session: true,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = uuidv4();
    const threeDay = new Date();
    threeDay.setDate(threeDay.getDate() + 3);

    const ipAdress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");

    const session = await prisma.session.create({
      data: {
        userId: existingUser.id,
        ipAddress: ipAdress || "",
        useAgent: userAgent || "",
        isOnline: true,
        lastActivityAt: new Date(),
        createdAt: new Date(),
        token: token,
        expiresAt: threeDay,
      },
    });

    (await cookies()).set({
      name: "sessionToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: threeDay,
      sameSite: "strict",
    });

    const {
      password,
      session: userSessions,
      ...userWithoutPassword
    } = existingUser;
    return userWithoutPassword as AuthenticatedUser;
  } catch (error) {
    console.error("Error lors de la connexion");
    throw error;
  }
};
