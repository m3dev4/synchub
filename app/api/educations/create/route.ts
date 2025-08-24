import { auth } from "@/lib/auth";
import { createEducation } from "@/server/education/createEducation";
import {
  checkRateLimit,
  validateOrigin,
  validateSecurityHeaders,
  sanitizeInput,
} from "@/lib/security";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema de validation pour les données d'éducation
const educationSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  school: z
    .string()
    .min(1, "School is required")
    .max(100, "School name too long"),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid end date")
    .optional(),
  description: z.string().max(500, "Description too long").optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Validation de sécurité
    if (!validateSecurityHeaders(request.headers)) {
      return NextResponse.json({ error: "Invalid headers" }, { status: 400 });
    }

    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    // Rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(`education:${clientIP}`, 10, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    let session = null;
    const cookieHeader = request.headers.get("cookie");

    // Method 1: Standard approach
    try {
      session = await auth.api.getSession({
        headers: request.headers,
      });
    } catch (error) {
      console.log("Auth session failed:", error);
    }

    // Method 2: Handle custom sessionToken cookie
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
            session = {
              user: {
                id: dbSession.user.id,
                email: dbSession.user.email,
              },
            };
          }

          await prisma.$disconnect();
        }
      } catch (error) {
        console.log("Session validation failed:", error);
      }
    }

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validation des données avec Zod
    const validatedData = educationSchema.parse(data);

    // Sanitisation des données
    const sanitizedData = {
      ...validatedData,
      title: sanitizeInput(validatedData.title),
      school: sanitizeInput(validatedData.school),
      description: validatedData.description
        ? sanitizeInput(validatedData.description)
        : undefined,
      userId: session.user.id,
    };

    const education = await createEducation(sanitizedData);

    return NextResponse.json({
      message: "Education created successfully",
      education: education,
      status: 200,
    });
  } catch (error: any) {
    console.error("Error creating education:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
