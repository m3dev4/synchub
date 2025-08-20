import { AllEducations } from "@/server/education/allEducations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const educations = await AllEducations();
    return NextResponse.json({
      success: true,
      status: 200,
      educations: educations,
    });
  } catch (error: any) {
    console.log("Erreur", error);
    NextResponse.json({
      success: false,
      status: 500,
      message: "Error lors du récupération l'éducations",
    });
  }
}
