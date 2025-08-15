/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { verifyEmail } from "@/server/auth/verify-email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({
        error: "Token is required",
        success: false,
        status: 400,
      });
    }

    const result = await verifyEmail(token);

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Email send successfully",
        status: 200,
      });
    }
  } catch (error: any) {
    console.error("Erreur lors de l'envoie", error);
    return NextResponse.json({
      error: error.message,
      success: false,
      status: 500,
    });
  }
}
