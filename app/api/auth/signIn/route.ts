import { signIn } from "@/server/auth/loginUser";
import {
  checkRateLimit,
  validateOrigin,
  validateSecurityHeaders,
  emailSchema,
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

    // Rate limiting plus strict pour les tentatives de connexion
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(`signin:${clientIP}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many login attempts" },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 },
      );
    }

    // Validation côté serveur de l'email
    const validatedEmail = emailSchema.parse(email);

    // Rate limiting par email pour éviter les attaques par force brute
    if (!checkRateLimit(`signin:email:${validatedEmail}`, 3, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many attempts for this email" },
        { status: 429 },
      );
    }

    const user = await signIn({ email: validatedEmail, password }, request);

    return NextResponse.json({ user }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login API error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (error.message === "Email not verified") {
      return NextResponse.json(
        { error: "Email not verified", needsVerification: true },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 400 },
    );
  }
}
