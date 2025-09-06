import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Session ID is required" },
        { status: 400 },
      );
    }

    // Get current user session from cookie
    const cookieHeader = request.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - No session token" },
        { status: 401 },
      );
    }

    // Verify current session
    const currentSession = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: { user: true },
    });

    if (!currentSession?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Invalid session" },
        { status: 401 },
      );
    }

    // Check if the session to delete belongs to the current user
    const sessionToDelete = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId: currentSession.user.id,
      },
    });

    if (!sessionToDelete) {
      return NextResponse.json(
        { success: false, message: "Session not found or unauthorized" },
        { status: 404 },
      );
    }

    // Delete the session
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    await prisma.$disconnect();
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
