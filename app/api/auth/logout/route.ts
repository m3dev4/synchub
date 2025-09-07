"use server";

import { logout } from "@/server/auth/logout";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/errorMessage";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const user = await logout(data.token);

    if (user) {
      return NextResponse.json({
        user: user,
        message: "User logged out successfully",
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error logging out user:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
