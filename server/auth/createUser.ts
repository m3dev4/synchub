"use server";

import { PrismaClient } from "@/lib/prisma-client-js";
import { UserCreateDto } from "@/types/user";
import { User } from "better-auth";
import bcrypt from "bcryptjs";
import { sendVerification } from "@/email/resend";

const prisma = new PrismaClient();

/**
 * Creates a new user and returns the newly created user
 * @param {UserCreateDto} data - The user data to create the user with
 * @returns {Promise<Partial<User>>} The newly created user
 * @throws {Error} If the email or password are missing
 * @throws {Error} If the user already exists
 * @throws {Error} If there is an error creating the user
 */
export const signUp = async (data: UserCreateDto): Promise<Partial<User>> => {
  try {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = 12;
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const emailVerificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Generate a unique username from email
    const emailPrefix = data.email.split("@")[0];
    const randomSuffix = Math.floor(Math.random() * 10000);
    const generatedUsername = `${emailPrefix}_${randomSuffix}`;

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        isVerify: false,
        emailVerificationToken: emailVerificationToken,
        emailVerificationTokenExpiresAt: tomorrow,
        onboarding: false,
        firstName: "",
        lastName: "",
        dateBirth: new Date(),
        username: generatedUsername,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await sendVerification(user.email, emailVerificationToken);

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
