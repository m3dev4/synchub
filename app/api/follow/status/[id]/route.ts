import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Vérifier le statut de suivi d'un utilisateur
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: followingId } = await params;
    const followerId = request.headers.get("x-user-id");

    if (!followerId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 },
      );
    }

    if (!followingId) {
      return NextResponse.json(
        { error: "Following user ID is required" },
        { status: 400 },
      );
    }

    // Vérifier si la relation existe
    const isFollowing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    // Compter les followers et following
    const [followersCount, followingCount] = await Promise.all([
      prisma.follow.count({
        where: { followingId },
      }),
      prisma.follow.count({
        where: { followerId: followingId },
      }),
    ]);

    return NextResponse.json({
      success: true,
      isFollowing: !!isFollowing,
      followersCount,
      followingCount,
    });
  } catch (error) {
    console.error("Error checking follow status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
