import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
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

    // Paramètres de pagination
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Récupérer les IDs des utilisateurs suivis + l'utilisateur lui-même
    const following = await prisma.follow.findMany({
      where: { followerId: session.user.id },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);
    followingIds.push(session.user.id); // Inclure ses propres posts

    // Construire la requête avec pagination
    // Si l'utilisateur ne suit personne (nouveau utilisateur), afficher tous les posts publics
    const whereClause: any = followingIds.length === 1 
      ? {
          visibility: "PUBLIC", // Tous les posts publics pour les nouveaux utilisateurs
        }
      : {
          authorId: { in: followingIds },
          visibility: { in: ["PUBLIC", "FOLLOWERS_ONLY"] },
        };

    if (cursor) {
      whereClause.createdAt = { lt: new Date(cursor) };
    }

    // Récupérer les posts
    const posts = await prisma.post.findMany({
      where: whereClause,
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
        media: true,
        collaborators: {
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
        reactions: {
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
        _count: {
          select: {
            comments: true,
            reactions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit + 1, // +1 pour savoir s'il y a plus de posts
    });

    // Vérifier s'il y a plus de posts
    const hasMore = posts.length > limit;
    const postsToReturn = hasMore ? posts.slice(0, limit) : posts;

    // Déterminer le prochain cursor
    const nextCursor = hasMore
      ? postsToReturn[postsToReturn.length - 1].createdAt.toISOString()
      : null;

    // Ajouter l'information de suivi pour chaque auteur
    const postsWithFollowInfo = await Promise.all(
      postsToReturn.map(async (post) => {
        const isFollowing =
          post.author.id !== session.user.id
            ? await prisma.follow.findFirst({
                where: {
                  followerId: session.user.id,
                  followingId: post.author.id,
                },
              })
            : null;

        return {
          ...post,
          author: {
            ...post.author,
            isFollowing: !!isFollowing,
          },
        };
      }),
    );

    return NextResponse.json({
      posts: postsWithFollowInfo,
      hasMore,
      nextCursor,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du feed:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
