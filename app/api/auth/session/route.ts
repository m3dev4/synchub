import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: {
        user: {
          include: {
            nationality: true,
            experiences: true,
            educations: true,
            userSkills: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
    });

    if (!session || !session.user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: session.user,
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
      },
    });
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
