/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { verifyEmail } from "@/server/auth/verify-email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        {
          error: "Token is required",
          success: false,
        },
        { status: 400 },
      );
    }

    const result = await verifyEmail(token);

    // Créer le cookie de session
    const response = NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
        user: result,
      },
      { status: 200 },
    );

    // Définir le cookie sessionToken
    if (result.sessionToken) {
      response.cookies.set({
        name: "sessionToken",
        value: result.sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
        sameSite: "strict",
        path: "/",
      });
    }

    return response;
  } catch (error: any) {
    console.error("Erreur lors de la vérification", error);
    return NextResponse.json(
      {
        error: error.message || "Code de vérification invalide ou expiré",
        success: false,
      },
      { status: 400 },
    );
  }
}
