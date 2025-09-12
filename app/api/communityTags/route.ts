import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { PrismaClient } = await import("@/lib/prisma-client-js");
    const prisma = new PrismaClient();

    const communityTags = await prisma.communityTags.findMany();
    await prisma.$disconnect();
    return NextResponse.json({
      success: true,
      data: communityTags,
    });
  } catch (error) {
    console.error("Error fetching community tags:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch community tags",
      },
      { status: 500 },
    );
  }
}
