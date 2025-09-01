import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitNotification } from "@/lib/socket";

// POST - Follow un utilisateur
export async function POST(request: NextRequest) {
  try {
    const { followingId } = await request.json();
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

    if (followerId === followingId) {
      return NextResponse.json(
        { error: "Cannot follow yourself" },
        { status: 400 },
      );
    }

    // Vérifier si l'utilisateur à suivre existe
    const userToFollow = await prisma.user.findUnique({
      where: { id: followingId },
    });

    if (!userToFollow) {
      return NextResponse.json(
        { error: "User to follow not found" },
        { status: 404 },
      );
    }

    // Vérifier si la relation existe déjà
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json(
        { error: "Already following this user" },
        { status: 409 },
      );
    }

    // Créer la relation de suivi
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
      include: {
        follower: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarPicture: true,
          },
        },
      },
    });

    // Créer une notification pour l'utilisateur suivi
    const notification = await prisma.notification.create({
      data: {
        userId: followingId,
        type: "FOLLOW",
        title: "Nouveau abonné",
        message: `${follow.follower.firstName} ${follow.follower.lastName} vous suit maintenant`,
        data: {
          followerId,
          followerName: `${follow.follower.firstName} ${follow.follower.lastName}`,
          followerAvatar: follow.follower.avatarPicture,
        },
      },
    });

    // Émettre la notification en temps réel
    try {
      emitNotification(followingId, {
        id: notification.id,
        userId: followingId,
        type: "FOLLOW",
        title: notification.title,
        message: notification.message,
        data: notification.data,
        createdAt: notification.createdAt,
      });
    } catch (socketError) {
      console.error("Socket emission error:", socketError);
      // Ne pas faire échouer la requête si Socket.IO échoue
    }

    return NextResponse.json({
      success: true,
      message: "User followed successfully",
      follow,
    });
  } catch (error) {
    console.error("Error following user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Unfollow un utilisateur
export async function DELETE(request: NextRequest) {
  try {
    const { followingId } = await request.json();
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
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (!existingFollow) {
      return NextResponse.json(
        { error: "Not following this user" },
        { status: 404 },
      );
    }

    // Supprimer la relation de suivi
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
