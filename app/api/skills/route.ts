import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Utiliser Prisma Client généré
    const { PrismaClient } = await import("@/lib/prisma-client-js");
    const prisma = new PrismaClient();

    const skills = await prisma.skill.findMany({
      include: {
        sousSkill: {
          include: {
            Technology: true,
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch skills",
      },
      { status: 500 },
    );
  }
}
