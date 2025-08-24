"use server";

import { resetPassword } from "@/server/auth/resetPassword";
import {
  checkRateLimit,
  validateOrigin,
  validateSecurityHeaders,
  tokenSchema,
  passwordSchema,
} from "@/lib/security";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Validation de sécurité
    if (!validateSecurityHeaders(request.headers)) {
      return NextResponse.json({ error: "Invalid headers" }, { status: 400 });
    }

    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    // Rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(`reset-password:${clientIP}`, 3, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Get token from query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    // Get new password from request body
    const data = await request.json();
    const { newPassword } = data;

    // Validation côté serveur
    if (!token) {
      return NextResponse.json(
        { error: "Token is required in query parameters" },
        { status: 400 },
      );
    }

    // Valider le token
    const validatedToken = tokenSchema.parse(token);

    // Valider le nouveau mot de passe
    const validatedPassword = passwordSchema.parse(newPassword);

    const user = await resetPassword(validatedToken, validatedPassword);

    if (user) {
      return NextResponse.json({
        user: user,
        message: "Password reset successfully",
        status: 200,
      });
    }
  } catch (error: any) {
    console.error("Error reseting password:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
