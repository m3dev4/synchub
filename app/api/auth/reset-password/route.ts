"use server";

import { resetPassword } from "@/server/auth/resetPassword";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get token from query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    // Get new password from request body
    const data = await request.json();
    const { newPassword } = data;

    if (!token) {
      return NextResponse.json(
        { error: "Token is required in query parameters" },
        { status: 400 },
      );
    }

    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required in request body" },
        { status: 400 },
      );
    }

    const user = await resetPassword(token, newPassword);

    if (user) {
      return NextResponse.json({
        user: user,
        message: "Password reset successfully",
        status: 200,
      });
    }
  } catch (error: any) {
    console.error("Error reseting password:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
