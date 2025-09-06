import { GetSession } from "@/server/user/sessions/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

    console.log("🔑 Found sessionToken:", sessionToken);

    // Look up session in database
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

      console.log("✅ Session found for user:", dbSession.user.email);

      const user = await GetSession(dbSession.user.id);
      await prisma.$disconnect();
      return NextResponse.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      await prisma.$disconnect();
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  } catch (error) {}
}
