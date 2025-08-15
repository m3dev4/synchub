import { signIn } from "@/server/auth/loginUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ou username et mot de passe requis" },
        { status: 400 },
      );
    }

    const user = await signIn({ email, password }, request);

    return NextResponse.json({ user }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la connexion" },
      { status: 400 },
    );
  }
}
