import { NextRequest, NextResponse } from "next/server";
import { CreatePostDto } from "@/types/posts";
import { emitNotification, getSocket } from "@/lib/socket";

export async function POST(request: NextRequest) {
  try {
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

    // Utiliser Prisma Client généré
    const { PrismaClient } = await import("@/lib/prisma-client-js");
    const prisma = new PrismaClient();

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

    const data: CreatePostDto = await request.json();

    // Validation
    if (!data.content || data.content.trim().length === 0) {
      return NextResponse.json(
        { error: "Le contenu du post est requis" },
        { status: 400 },
      );
    }

    if (data.content.length > 2000) {
      return NextResponse.json(
        { error: "Le contenu ne peut pas dépasser 2000 caractères" },
        { status: 400 },
      );
    }

    // Créer le post
    const post = await prisma.post.create({
      data: {
        content: data.content.trim(),
        visibility: data.visibility || "PUBLIC",
        media: data.media,
        authorId: session.user.id,
      },
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

    // Récupérer tous les followers pour les notifications
    const followers = await prisma.follow.findMany({
      where: { followingId: session.user.id },
      include: {
        follower: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    // Créer les notifications pour les followers
    const notifications = await Promise.all(
      followers.map(async (follow) => {
        const notification = await prisma.notification.create({
          data: {
            userId: follow.follower.id,
            type: "POST" as any,
            title: "Nouveau post",
            message: `${session.user.firstName} ${session.user.lastName} a publié un nouveau post`,
            data: JSON.stringify({
              postId: post.id,
              authorId: session.user.id,
              authorName: `${session.user.firstName} ${session.user.lastName}`,
            }),
          },
        });

        // Émettre la notification en temps réel
        // Note: Les notifications sont stockées en DB et seront visibles après refresh
        // Le socket temps réel sera géré par un système de polling ou webhook séparé
        console.log(
          `📝 Notification créée pour user ${follow.follower.id}: ${notification.id}`,
        );

        return notification;
      }),
    );

    // Fermer la connexion Prisma
    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      post,
      notificationsSent: notifications.length,
    });
  } catch (error) {
    console.error("Erreur lors de la création du post:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
