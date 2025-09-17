import { PrismaClient } from "@/lib/prisma-client-js";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized - No session token",
        status: 401,
      });
    }

    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized - Invalid or expired session",
        status: 401,
      });
    }

    const { id } = await params;

    const community = await prisma.community.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }, { customLink: id }],
      },
      include: {
        members: true,
      },
    });

    if (!community) {
      return NextResponse.json({
        success: false,
        message: "Community not found",
        status: 404,
      });
    }

    const isMember = community.members.some(
      (member) => member.userId === session.user.id,
    );
    const isOwner = community.ownerId === session.user.id;

    if (community.isPrivate && !isMember && !isOwner) {
      return NextResponse.json({
        success: false,
        message: "You are not a member of this community",
        status: 403,
      });
    }

    //Recuperation des channels
    const channels = await prisma.channel.findMany({
      where: {
        communityId: community.id,
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: channels,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching channels:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
    console.log("✅ Disconnected from database");
  }
}
