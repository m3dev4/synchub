import { userUpdate } from "@/server/user/userProfileUpdate";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      console.log("❌ No sessionToken found");
      return NextResponse.json(
        { success: false, message: "Unauthorized - No session token" },
        { status: 401 },
      );
    }

    const { PrismaClient } = await import("@/lib/prisma-client-js");
    const prisma = new PrismaClient();

    try {
      const dbSession = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: { user: true },
      });

      if (!dbSession?.user) {
        console.log("❌ No valid session found in database");
        await prisma.$disconnect();
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized - Invalid or expired session",
          },
          { status: 401 },
        );
      }

      const data = await request.json();

      const user = await userUpdate(dbSession.user.id, data);
      return NextResponse.json({
        success: true,
        user,
        status: 200,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
