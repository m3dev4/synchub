import { AllExperiences } from "@/server/experience/AllExperience";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const experiences = await AllExperiences();
    return NextResponse.json({
      experiences: experiences,
      status: 200,
    });
  } catch (error) {}
}
