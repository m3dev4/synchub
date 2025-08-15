/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signUp } from "@/server/auth/createUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const user = await signUp(data);

    return NextResponse.json({
      user: user,
      message: "User created successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
