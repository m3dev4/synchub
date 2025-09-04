import { onboarding } from "@/server/onboarding/onboarding";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    // Debug: Log all cookies
    const cookieHeader = request.headers.get("cookie");

    // Try multiple approaches to get session
    let session = null;

    // Method 1: Standard approach
    try {
      session = await auth.api.getSession({
        headers: request.headers,
      });
    } catch (error) {
      NextResponse.json({
        message: "Method 1 Failed",
        error,
        status: 500
      });
    }

    // Method 2: Try with just the request object
    if (!session) {
      try {
        session = await auth.api.getSession({
          headers: request.headers,
        });
        NextResponse.json({
          message: "✅ Method 2 - Second attempt:",
          session,
          status: 200,
          success: true,
        });
      } catch (error: any) {
        NextResponse.json({
          message: "❌ Method 2 failed",
          error,
          status: 500,
          success: false
        });
      }
    }

    // Method 3: Handle custom sessionToken cookie
    if (!session && cookieHeader) {
      try {
        const sessionTokenMatch = cookieHeader.match(/sessionToken=([^;]+)/);
        if (sessionTokenMatch) {
          const sessionToken = decodeURIComponent(sessionTokenMatch[1]);

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
            NextResponse.json({
              message: "✅ Method  - Second attempt:",
              session,
              status: 200,
              success: true,
            });
          } else {
            NextResponse.json({
              message: "❌ Session expire or not found on the database",
              session,
              status: 500,
  
            });
          }

          await prisma.$disconnect();
        }
      } catch (error) {
        NextResponse.json({
          message: "✅ Method 3 failed:",
          session,
          status: 500,
        });
      }
    }

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - User not authenticated" },
        { status: 401 },
      );
    }

    const data = await request.json();

    // Add userId from session to the data and convert dateBirth to Date object
    const onboardingData = {
      ...data,
      userId: session.user.id,
      // Convert dateBirth string to Date object if it exists
      dateBirth: data.dateBirth ? new Date(data.dateBirth) : undefined,
    };

    const result = await onboarding(onboardingData, session.user.id);
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error: any) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
