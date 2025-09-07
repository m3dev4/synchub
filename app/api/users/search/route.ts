import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    // Rechercher des utilisateurs par nom, prénom ou username
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            isVerify: true, // Seulement les utilisateurs vérifiés
            onboarding: true, // Seulement les utilisateurs qui ont terminé l'onboarding
          },
          {
            OR: [
              {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        avatarPicture: true,
      },
      take: 10, // Limiter à 10 résultats
      orderBy: {
        firstName: "asc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur recherche utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 },
    );
  }
}
