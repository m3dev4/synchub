import { allSkills } from "@/server/skills/getAllSkills";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/errorMessage";

export async function GET() {
  try {
    const skills = await allSkills();
    return NextResponse.json({ skills }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des skills", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
