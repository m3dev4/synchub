import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/prisma-client-js";
import { getErrorMessage } from "@/utils/errorMessage";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - No session token" },
        { status: 401 }
      );
    }

    // Vérification de la session
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session invalide" },
        { status: 401 }
      );
    }

    // Récupérer les communautés où l'utilisateur est membre ou propriétaire
    const userCommunities = await prisma.community.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          {
            members: {
              some: {
                userId: session.user.id
              }
            }
          }
        ]
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            members: true,
            channels: true
          }
        }
      },
      orderBy: [
        { ownerId: session.user.id ? "asc" : "desc" }, // Ses communautés en premier
        { createdAt: "desc" }
      ]
    });

    return NextResponse.json({
      success: true,
      data: userCommunities,
      status: 200,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erreur interne du serveur",
      error: getErrorMessage(error),
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
