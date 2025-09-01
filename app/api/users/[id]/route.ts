import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    // Récupérer l'utilisateur avec ses relations
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarPicture: true,
        coverPicture: true,
        description: true,
        title: true,
        titleProfession: true,
        linkWebsite: true,
        dateBirth: true,
        createdAt: true,
        nationalityId: true,
        nationality: {
          select: {
            id: true,
            name: true,
            flag: true,
          },
        },
        experiences: {
          select: {
            id: true,
            title: true,
            company: true,
            startDate: true,
            endDate: true,
            current: true,
          },
          orderBy: {
            startDate: "desc",
          },
        },
        educations: {
          select: {
            id: true,
            title: true,
            school: true,
            startDate: true,
            endDate: true,
            current: true,
          },
          orderBy: {
            startDate: "desc",
          },
        },
        userSkills: {
          select: {
            id: true,
            level: true,
            skill: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
