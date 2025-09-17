import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/prisma-client-js";
import { getErrorMessage } from "@/utils/errorMessage";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Vérifier que la communauté existe
    const community = await prisma.community.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id },
          { customLink: id }
        ]
      },
      include: {
        members: {
          where: {
            userId: session.user.id
          }
        }
      }
    });

    if (!community) {
      return NextResponse.json(
        { success: false, message: "Communauté non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur est déjà membre
    if (community.members.length > 0) {
      return NextResponse.json(
        { success: false, message: "Vous êtes déjà membre de cette communauté" },
        { status: 400 }
      );
    }

    // Vérifier si c'est le propriétaire
    if (community.ownerId === session.user.id) {
      return NextResponse.json(
        { success: false, message: "Vous êtes le propriétaire de cette communauté" },
        { status: 400 }
      );
    }

    // Pour les communautés privées, on pourrait implémenter un système de demandes
    // Pour l'instant, on rejoint directement même les privées
    if (community.isPrivate) {
      // TODO: Implémenter système de demandes pour communautés privées
      return NextResponse.json(
        { success: false, message: "Cette communauté est privée. Les demandes ne sont pas encore implémentées." },
        { status: 403 }
      );
    }

    // Ajouter l'utilisateur comme membre
    const newMember = await prisma.communityMember.create({
      data: {
        userId: session.user.id,
        communityId: community.id,
        xp: 0,
        level: 1,
        joinedAt: new Date(),
        lastActive: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarPicture: true,
          }
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
            customLink: true,
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: `Vous avez rejoint ${community.name} avec succès !`,
      data: newMember,
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

// Quitter une communauté
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Vérifier que la communauté existe
    const community = await prisma.community.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id },
          { customLink: id }
        ]
      }
    });

    if (!community) {
      return NextResponse.json(
        { success: false, message: "Communauté non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur est le propriétaire
    if (community.ownerId === session.user.id) {
      return NextResponse.json(
        { success: false, message: "Vous ne pouvez pas quitter une communauté dont vous êtes propriétaire" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur est membre
    const membership = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: session.user.id,
          communityId: community.id
        }
      }
    });

    if (!membership) {
      return NextResponse.json(
        { success: false, message: "Vous n'êtes pas membre de cette communauté" },
        { status: 400 }
      );
    }

    // Supprimer l'adhésion
    await prisma.communityMember.delete({
      where: {
        userId_communityId: {
          userId: session.user.id,
          communityId: community.id
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: `Vous avez quitté ${community.name}`,
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
