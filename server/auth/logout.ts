"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const logout = async (userId: string) => {
  const session = await prisma.session.deleteMany({
    where: {
      userId: userId,
    },
  });
  if (!session) {
    throw new Error("Session not found");
  }

  (await cookies()).set({
    name: "sessionToken",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    sameSite: "strict",
  });
  return session;
};
