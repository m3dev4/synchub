import { allNationalities } from "@/server/nationaliy/getAllNationality";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const nationalities = await allNationalities();
    return NextResponse.json({ nationalities }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors de la recupération", error);
    return NextResponse.json(
      { error: "Error lors de la récupération des pays" },
      { status: 500 },
    );
  }
}
