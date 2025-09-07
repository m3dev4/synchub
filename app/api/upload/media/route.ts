import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
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

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 },
      );
    }

    const uploadedMedia = [];

    for (const file of files) {
      // Vérifier la taille du fichier (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json(
          { error: `Fichier ${file.name} trop volumineux (max 50MB)` },
          { status: 400 },
        );
      }

      // Déterminer le type de média et resource_type
      let mediaType: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";
      let resourceType: "image" | "video" | "raw" | "auto" = "auto";
      let folder = "synchub/posts";

      if (file.type.startsWith("image/")) {
        mediaType = "IMAGE";
        resourceType = "image";
        folder = "synchub/posts/images";
      } else if (file.type.startsWith("video/")) {
        mediaType = "VIDEO";
        resourceType = "video";
        folder = "synchub/posts/videos";
      } else if (file.type.startsWith("audio/")) {
        mediaType = "AUDIO";
        resourceType = "video"; // Cloudinary traite l'audio comme video
        folder = "synchub/posts/audio";
      } else {
        mediaType = "DOCUMENT";
        resourceType = "raw";
        folder = "synchub/posts/documents";
      }

      // Convertir le fichier en Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload vers Cloudinary
      const result = await uploadToCloudinary(buffer, folder, resourceType);

      uploadedMedia.push({
        type: mediaType,
        url: result.url,
        publicId: result.public_id,
        filename: file.name,
        size: result.bytes || file.size,
        duration: result.duration,
        format: result.format,
      });
    }

    return NextResponse.json({
      success: true,
      media: uploadedMedia,
    });
  } catch (error) {
    console.error("Erreur upload média:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload des médias" },
      { status: 500 },
    );
  }
}
