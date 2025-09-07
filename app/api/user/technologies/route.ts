import { NextRequest, NextResponse } from "next/server";

// GET user technologies
export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Non autorisé - Token de session manquant" },
        { status: 401 },
      );
    }

    // Utiliser Prisma Client généré
    const { PrismaClient } = await import("@/lib/prisma-client-js");
    const prisma = new PrismaClient();

    // Vérifier la session
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé - Session invalide" },
        { status: 401 },
      );
    }

    const userTechnologies = await prisma.userTechnology.findMany({
      where: { userId: session.user.id },
      include: {
        technology: {
          include: {
            sousSkill: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      data: userTechnologies,
    });
  } catch (error) {
    console.error("Error fetching user technologies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user technologies" },
      { status: 500 },
    );
  }
}

// POST add user technology
export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Non autorisé - Token de session manquant" },
        { status: 401 },
      );
    }

    // Utiliser Prisma Client généré
    const { PrismaClient } = await import("@/lib/prisma-client-js");
    const prisma = new PrismaClient();

    // Vérifier la session
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé - Session invalide" },
        { status: 401 },
      );
    }

    const { technologyId, level } = await request.json();

    if (!technologyId || !level) {
      return NextResponse.json(
        { success: false, error: "technologyId and level are required" },
        { status: 400 },
      );
    }

    // Check if technology exists
    const technology = await prisma.technology.findUnique({
      where: { id: technologyId },
    });

    if (!technology) {
      return NextResponse.json(
        { success: false, error: "Technology not found" },
        { status: 404 },
      );
    }

    // Check if user already has this technology
    const existingUserTechnology = await prisma.userTechnology.findUnique({
      where: {
        userId_technologyId: {
          userId: session.user.id,
          technologyId: technologyId,
        },
      },
    });

    if (existingUserTechnology) {
      // Update existing technology level
      const updatedUserTechnology = await prisma.userTechnology.update({
        where: { id: existingUserTechnology.id },
        data: { level },
        include: {
          technology: {
            include: {
              sousSkill: {
                include: {
                  skill: true,
                },
              },
            },
          },
        },
      });

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        data: updatedUserTechnology,
        message: "Technology level updated successfully",
      });
    } else {
      // Create new user technology
      const newUserTechnology = await prisma.userTechnology.create({
        data: {
          userId: session.user.id,
          technologyId: technologyId,
          level: level,
        },
        include: {
          technology: {
            include: {
              sousSkill: {
                include: {
                  skill: true,
                },
              },
            },
          },
        },
      });

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        data: newUserTechnology,
        message: "Technology added successfully",
      });
    }
  } catch (error) {
    console.error("Error adding user technology:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add technology" },
      { status: 500 },
    );
  }
}

// DELETE remove user technology
export async function DELETE(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Non autorisé - Token de session manquant" },
        { status: 401 },
      );
    }

    // Utiliser Prisma Client généré
    const { PrismaClient } = await import("@/lib/prisma-client-js");
    const prisma = new PrismaClient();

    // Vérifier la session
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé - Session invalide" },
        { status: 401 },
      );
    }

    const { technologyId } = await request.json();

    if (!technologyId) {
      return NextResponse.json(
        { success: false, error: "technologyId is required" },
        { status: 400 },
      );
    }

    const deletedUserTechnology = await prisma.userTechnology.deleteMany({
      where: {
        userId: session.user.id,
        technologyId: technologyId,
      },
    });

    if (deletedUserTechnology.count === 0) {
      return NextResponse.json(
        { success: false, error: "Technology not found" },
        { status: 404 },
      );
    }

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: "Technology removed successfully",
    });
  } catch (error) {
    console.error("Error removing user technology:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove technology" },
      { status: 500 },
    );
  }
}
