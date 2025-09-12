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
      console.log("❌ No sessionToken found");
      return NextResponse.json(
        { success: false, message: "Unauthorized - No session token" },
        { status: 401 },
      );
    }
    const { id } = await params;

    const community = await prisma.community.findFirst({
      where: {
        OR: [{ id }, { customLink: id }, { slug: id }],
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            avatarPicture: true,
            firstName: true,
            lastName: true,
          },
        },
        category: true,
        channels: {
          orderBy: {
            position: "asc",
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatarPicture: true,
                firstName: true,
                lastName: true,
                isOnline: true,
              },
            },
          },
        },
      },
    });

    if (!community) {
      return NextResponse.json({
        error: "Community not found",
        status: 404,
        success: false,
      });
    }

    return NextResponse.json({
      success: true,
      community,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching community:", error);
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
      success: false,
    });
  }
}
