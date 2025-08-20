import { auth } from "@/lib/auth";
import { createEducation } from "@/server/education/createEducation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let session = null;
    const cookieHeader = request.headers.get("cookie");

    // Method 1: Standard approach
    try {
      session = await auth.api.getSession({
        headers: request.headers,
      });
      console.log("✅ Method 1 - Standard headers:", session);
    } catch (error) {
      console.log("❌ Method 1 failed:", error);
    }

    // Method 2: Try with just the request object
    if (!session) {
      try {
        session = await auth.api.getSession({
          headers: request.headers,
        });
        console.log("✅ Method 2 - Second attempt:", session);
      } catch (error) {
        console.log("❌ Method 2 failed:", error);
      }
    }

    // Method 3: Handle custom sessionToken cookie
    if (!session && cookieHeader) {
      try {
        const sessionTokenMatch = cookieHeader.match(/sessionToken=([^;]+)/);
        if (sessionTokenMatch) {
          const sessionToken = decodeURIComponent(sessionTokenMatch[1]);
          console.log("🔑 Found sessionToken:", sessionToken);

          // Query database directly for this session token
          const { PrismaClient } = await import("@/lib/prisma-client-js");
          const prisma = new PrismaClient();

          const dbSession = await prisma.session.findFirst({
            where: { token: sessionToken },
            include: { user: true },
          });

          if (dbSession?.user && dbSession.expiresAt > new Date()) {
            // Create a session-like object
            session = {
              user: {
                id: dbSession.user.id,
                email: dbSession.user.email,
              },
            };
            console.log("✅ Method 3 - Custom sessionToken:", session);
          } else {
            console.log("❌ Session expired or not found in database");
          }

          await prisma.$disconnect();
        }
      } catch (error) {
        console.log("❌ Method 3 failed:", error);
      }
    }

    if (!session?.user?.id) {
      console.log("❌ No valid session found after all methods");
      return NextResponse.json(
        { success: false, message: "Unauthorized - User not authenticated" },
        { status: 401 },
      );
    }

    const data = await request.json();

    const educationData = {
      ...data,
      userId: session.user.id,
    };

    const education = await createEducation(educationData);

    return NextResponse.json({
      message: "La création d'education s'est fait avec success",
      education: education,
      status: 200,
    });
  } catch (error: any) {
    console.error("Erreur lors de la création d'éducation", error);
    return NextResponse.json({
      message: "Erreur lors de la création d'éducation",
      error: error.message,
      status: 500,
    });
  }
}
