import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: postId } = await params;
    const { type } = await request.json();

    // Vérifier l'authentification
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

    // Vérifier que le post existe
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
    }

    // Vérifier si l'utilisateur a déjà réagi avec ce type
    const existingReaction = await prisma.postReaction.findUnique({
      where: {
        postId_userId_type: {
          postId,
          userId: session.user.id,
          type,
        },
      },
    });

    if (existingReaction) {
      // Supprimer la réaction existante
      await prisma.postReaction.delete({
        where: { id: existingReaction.id },
      });

      return NextResponse.json({
        message: "Réaction supprimée",
        action: "removed",
      });
    } else {
      // Supprimer toute autre réaction de cet utilisateur sur ce post
      await prisma.postReaction.deleteMany({
        where: {
          postId,
          userId: session.user.id,
        },
      });

      // Ajouter la nouvelle réaction
      const reaction = await prisma.postReaction.create({
        data: {
          postId,
          userId: session.user.id,
          type,
        },
      });

      // Créer une notification si ce n'est pas l'auteur du post
      if (post.authorId !== session.user.id) {
        await prisma.notification.create({
          data: {
            userId: post.authorId,
            type: "REACTION",
            title: "Nouvelle réaction",
            message: `${session.user.firstName} ${session.user.lastName} a réagi à votre post`,
            data: {
              postId,
              reactionType: type,
              userId: session.user.id,
            },
          },
        });
      }

      return NextResponse.json({
        message: "Réaction ajoutée",
        action: "added",
        reaction,
      });
    }
  } catch (error) {
    console.error("Erreur lors de la gestion de la réaction:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: postId } = await params;

    // Récupérer toutes les réactions du post avec comptage
    const reactions = await prisma.postReaction.groupBy({
      by: ["type"],
      where: { postId },
      _count: { type: true },
    });

    // Récupérer la réaction de l'utilisateur actuel si connecté
    const cookieHeader = request.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    let userReaction = null;
    if (sessionToken) {
      const session = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: { gt: new Date() },
        },
      });

      if (session) {
        userReaction = await prisma.postReaction.findFirst({
          where: {
            postId,
            userId: session.userId,
          },
        });
      }
    }

    return NextResponse.json({
      reactions: reactions.map((r) => ({
        type: r.type,
        count: r._count.type,
      })),
      userReaction: userReaction?.type || null,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des réactions:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
