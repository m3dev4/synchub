/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signUp } from "@/server/auth/createUser";
import {
  checkRateLimit,
  validateOrigin,
  validateSecurityHeaders,
} from "@/lib/security";
import { createUserSchema } from "@/validations/auth/authValidation";
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
    // const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    // if (!checkRateLimit(`signup:${clientIP}`, 3, 15 * 60 * 1000)) {
    //   return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    // }

    const data = await request.json();

    // Debug: Log des données reçues
    console.log("Données reçues:", {
      email: data.email,
      passwordLength: data.password?.length,
      password: data.password,
    });

    // Validation côté serveur avec Zod
    const validatedData = createUserSchema.parse(data);

    const user = await signUp(validatedData);

    return NextResponse.json({
      user: user,
      message: "User created successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Ne pas exposer les détails d'erreur en production
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
