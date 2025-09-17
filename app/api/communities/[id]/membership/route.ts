import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/prisma-client-js";
import { getErrorMessage } from "@/utils/errorMessage";

const prisma = new PrismaClient();

export async function GET(
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

    const isOwner = community.ownerId === session.user.id;
    const isMember = community.members.length > 0;
    const canJoin = !isOwner && !isMember && !community.isPrivate;

    return NextResponse.json({
      success: true,
      data: {
        isMember,
        isOwner,
        canJoin,
        isPrivate: community.isPrivate,
        communityId: community.id,
        communityName: community.name,
      },
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
