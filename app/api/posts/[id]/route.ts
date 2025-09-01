import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatarPicture: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Erreur lors de la récupération du post:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Récupérer l'utilisateur depuis les cookies
    const cookieHeader = request.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Non autorisé - Token de session manquant" },
        { status: 401 },
      );
    }

    // Vérifier la session
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé - Session invalide" },
        { status: 401 },
      );
    }

    // Vérifier que le post existe et appartient à l'utilisateur
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json(
        {
          error:
            "Non autorisé - Vous ne pouvez supprimer que vos propres posts",
        },
        { status: 403 },
      );
    }

    // Supprimer le post
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Post supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du post:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
