import { onboarding } from "@/server/onboarding/onboarding";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    // Debug: Log all cookies
    const cookieHeader = request.headers.get("cookie");
    console.log("🍪 All cookies:", cookieHeader);

    // Debug: Log specific headers
    console.log("📋 Headers:", {
      authorization: request.headers.get("authorization"),
      cookie: request.headers.get("cookie"),
      "user-agent": request.headers.get("user-agent"),
    });

    // Try multiple approaches to get session
    let session = null;

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

    console.log("✅ Session found for user:", session.user.email);

    const data = await request.json();

    // Add userId from session to the data and convert dateBirth to Date object
    const onboardingData = {
      ...data,
      userId: session.user.id,
      // Convert dateBirth string to Date object if it exists
      dateBirth: data.dateBirth ? new Date(data.dateBirth) : undefined,
    };

    const result = await onboarding(onboardingData);
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
