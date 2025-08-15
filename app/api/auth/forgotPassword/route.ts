"use server";

import { forgotPassword } from "@/server/auth/forgotPassword";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const user = await forgotPassword(data.email);

    if (user) {
      return NextResponse.json({
        user: user,
        message: "Email send successfully",
        status: 200,
      });
    }
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
