import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// GET user skills
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

    const userSkills = await prisma.userSkill.findMany({
      where: { userId: session.user.id },
      include: {
        skill: {
          include: {
            sousSkill: {
              include: {
                Technology: true,
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
      data: userSkills,
    });
  } catch (error) {
    console.error("Error fetching user skills:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user skills" },
      { status: 500 },
    );
  }
}

// POST add user skill
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

    const { skillId, level } = await request.json();

    if (!skillId || !level) {
      return NextResponse.json(
        { success: false, error: "skillId and level are required" },
        { status: 400 },
      );
    }

    // Check if skill exists
    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
    });

    if (!skill) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 },
      );
    }

    // Check if user already has this skill
    const existingUserSkill = await prisma.userSkill.findUnique({
      where: {
        userId_skillId: {
          userId: session.user.id,
          skillId: skillId,
        },
      },
    });

    if (existingUserSkill) {
      // Update existing skill level
      const updatedUserSkill = await prisma.userSkill.update({
        where: { id: existingUserSkill.id },
        data: { level },
        include: {
          skill: {
            include: {
              sousSkill: {
                include: {
                  Technology: true,
                },
              },
            },
          },
        },
      });

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        data: updatedUserSkill,
        message: "Skill level updated successfully",
      });
    } else {
      // Create new user skill
      const newUserSkill = await prisma.userSkill.create({
        data: {
          userId: session.user.id,
          skillId: skillId,
          level: level,
        },
        include: {
          skill: {
            include: {
              sousSkill: {
                include: {
                  Technology: true,
                },
              },
            },
          },
        },
      });

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        data: newUserSkill,
        message: "Skill added successfully",
      });
    }
  } catch (error) {
    console.error("Error adding user skill:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add skill" },
      { status: 500 },
    );
  }
}

// DELETE remove user skill
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

    const { skillId } = await request.json();

    if (!skillId) {
      return NextResponse.json(
        { success: false, error: "skillId is required" },
        { status: 400 },
      );
    }

    const deletedUserSkill = await prisma.userSkill.deleteMany({
      where: {
        userId: session.user.id,
        skillId: skillId,
      },
    });

    if (deletedUserSkill.count === 0) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 },
      );
    }

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: "Skill removed successfully",
    });
  } catch (error) {
    console.error("Error removing user skill:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove skill" },
      { status: 500 },
    );
  }
}
