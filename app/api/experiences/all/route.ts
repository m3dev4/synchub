import { AllExperiences } from "@/server/experience/AllExperience";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const experiences = await AllExperiences();
    return NextResponse.json({
      success: true,
      experiences: experiences,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des expériences:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des expériences",
        experiences: [],
      },
      { status: 500 },
    );
  }
}
