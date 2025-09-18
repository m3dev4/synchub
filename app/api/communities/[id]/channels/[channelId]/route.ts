import { PrismaClient } from "@/lib/prisma-client-js";
import { getErrorMessage } from "@/utils/errorMessage";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; channelId: string }> },
) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      console.log("❌ No sesfsionToken found");
      return NextResponse.json(
        { success: false, message: "Unauthorized - No session token" },
        { status: 401 },
      );
    }

    const { id, channelId } = await params;

    const channel = await prisma.channel.findUnique({
      where: {
        id: channelId,
        communityId: id,
      },
    });

    if (!channel) {
      return NextResponse.json({
        success: false,
        message: "Channel not found",
        status: 404,
      });
    }

    return NextResponse.json({
      success: true,
      data: channel,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching channel:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: getErrorMessage(error),
      status: 500,
    });
  }
}
