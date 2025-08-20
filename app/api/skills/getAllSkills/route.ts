import { allSkills } from "@/server/skills/getAllSkills";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const skills = await allSkills();
    return NextResponse.json({ skills }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors de la récupération des skills", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des compétences" },
      { status: 500 },
    );
  }
}
