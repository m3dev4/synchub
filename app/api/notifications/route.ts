import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Récupérer les notifications d'un utilisateur
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const unreadOnly = searchParams.get("unread") === "true";

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 },
      );
    }

    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(unreadOnly && { read: false }),
    };

    const [notifications, totalCount, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, read: false } }),
    ]);

    return NextResponse.json({
      success: true,
      notifications,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      unreadCount,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PATCH - Marquer des notifications comme lues
export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { notificationIds, markAllAsRead } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 },
      );
    }

    if (markAllAsRead) {
      // Marquer toutes les notifications comme lues
      await prisma.notification.updateMany({
        where: {
          userId,
          read: false,
        },
        data: {
          read: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "All notifications marked as read",
      });
    }

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: "Notification IDs are required" },
        { status: 400 },
      );
    }

    // Marquer les notifications spécifiées comme lues
    await prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
        userId, // Sécurité : s'assurer que l'utilisateur possède ces notifications
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Supprimer des notifications
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { notificationIds } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 },
      );
    }

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: "Notification IDs are required" },
        { status: 400 },
      );
    }

    // Supprimer les notifications spécifiées
    await prisma.notification.deleteMany({
      where: {
        id: { in: notificationIds },
        userId, // Sécurité : s'assurer que l'utilisateur possède ces notifications
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notifications deleted",
    });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
