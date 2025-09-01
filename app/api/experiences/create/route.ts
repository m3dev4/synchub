import { createExperience } from "@/server/experience/createExperience";
import { CreateExperienceData } from "@/types/experiences";
import { auth } from "@/lib/auth";
import {
  checkRateLimit,
  validateOrigin,
  validateSecurityHeaders,
  sanitizeInput,
} from "@/lib/security";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema de validation pour les données d'expérience
const experienceSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  company: z
    .string()
    .min(1, "Company is required")
    .max(100, "Company name too long"),
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
    if (!checkRateLimit(`experience:${clientIP}`, 10, 15 * 60 * 1000)) {
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
    const validatedData = experienceSchema.parse(data);

    // Sanitisation des données
    const sanitizedData: CreateExperienceData = {
      title: sanitizeInput(validatedData.title),
      company: sanitizeInput(validatedData.company),
      description: validatedData.description
        ? sanitizeInput(validatedData.description)
        : undefined,
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate
        ? new Date(validatedData.endDate)
        : undefined,
      current: !validatedData.endDate, // Si pas de date de fin, alors c'est actuel
      userId: session.user.id,
    };

    const experience = await createExperience(sanitizedData);

    return NextResponse.json({
      message: "Experience created successfully",
      experience: experience,
      status: 200,
    });
  } catch (error: any) {
    console.error("Experience creation error:", error);

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
