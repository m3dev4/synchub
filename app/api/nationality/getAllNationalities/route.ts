import { allNationalities } from "@/server/nationaliy/getAllNationality";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/errorMessage";

export async function GET() {
  try {
    const nationalities = await allNationalities();
    return NextResponse.json({ nationalities }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la recupération", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
