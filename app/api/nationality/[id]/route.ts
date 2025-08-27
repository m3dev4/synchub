import { getNationalityById } from "@/server/nationaliy/getNationalityById";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID de nationalité requis" },
        { status: 400 },
      );
    }

    const nationality = await getNationalityById(id);

    if (!nationality) {
      return NextResponse.json(
        { error: "Nationalité non trouvée" },
        { status: 404 },
      );
    }

    return NextResponse.json(nationality);
  } catch (error) {
    console.error("Erreur lors de la récupération de la nationalité:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
