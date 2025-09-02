import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: postId } = await params;
    const { content, parentId } = await request.json();

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

    // Vérifier le commentaire parent si spécifié
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment || parentComment.postId !== postId) {
        return NextResponse.json(
          { error: "Commentaire parent invalide" },
          { status: 400 },
        );
      }
    }

    // Extraire les mentions du contenu
    const mentionRegex = /@(\w+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]);
    }

    // Créer le commentaire
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: session.user.id,
        content,
        parentId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatarPicture: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                avatarPicture: true,
              },
            },
          },
        },
      },
    });

    // Traiter les mentions
    for (const username of mentions) {
      const mentionedUser = await prisma.user.findUnique({
        where: { username },
      });

      if (mentionedUser && mentionedUser.id !== session.user.id) {
        // Créer la mention
        await prisma.mention.create({
          data: {
            postId,
            commentId: comment.id,
            userId: mentionedUser.id,
          },
        });

        // Créer une notification
        await prisma.notification.create({
          data: {
            userId: mentionedUser.id,
            type: "MENTION",
            title: "Vous avez été mentionné",
            message: `${session.user.firstName} ${session.user.lastName} vous a mentionné dans un commentaire`,
            data: {
              postId,
              commentId: comment.id,
              userId: session.user.id,
            },
          },
        });
      }
    }

    // Créer une notification pour l'auteur du post (si ce n'est pas lui qui commente)
    if (post.authorId !== session.user.id) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: "COMMENT",
          title: "Nouveau commentaire",
          message: `${session.user.firstName} ${session.user.lastName} a commenté votre post`,
          data: {
            postId,
            commentId: comment.id,
            userId: session.user.id,
          },
        },
      });
    }

    return NextResponse.json({
      message: "Commentaire créé avec succès",
      comment,
    });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
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
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Récupérer les commentaires principaux (sans parent)
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatarPicture: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                avatarPicture: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    avatarPicture: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    // Compter le total des commentaires
    const totalComments = await prisma.comment.count({
      where: { postId },
    });

    return NextResponse.json({
      comments,
      totalComments,
      hasMore: offset + limit < totalComments,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
