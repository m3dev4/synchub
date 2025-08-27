import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    console.log("Avatar upload API called");

    // Récupérer l'ID utilisateur depuis les headers
    const userId = request.headers.get("x-user-id");
    console.log("User ID from headers:", userId);

    if (!userId) {
      console.log("No user ID provided");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 },
      );
    }

    // Récupérer les données du formulaire
    const formData = await request.formData();
    const file = formData.get("avatar") as File;
    console.log("File received:", file?.name, file?.size, file?.type);

    if (!file) {
      console.log("No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      console.log("Invalid file type:", file.type);
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 },
      );
    }

    // Vérifier la taille du fichier (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.log("File too large:", file.size);
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    // Convertir le fichier en Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log("File converted to buffer, size:", buffer.length);

    // Vérifier que l'utilisateur existe
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, avatarPicture: true },
    });

    if (!currentUser) {
      console.log("User not found:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Current user found, uploading to Cloudinary...");

    // Upload vers Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, "synchub/avatars");
    console.log("Cloudinary upload result:", uploadResult.url);

    // Mettre à jour la base de données
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatarPicture: uploadResult.url,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarPicture: true,
      },
    });

    console.log("Database updated successfully");

    // Supprimer l'ancienne image de Cloudinary si elle existe
    if (
      currentUser.avatarPicture &&
      currentUser.avatarPicture.includes("cloudinary")
    ) {
      try {
        const urlParts = currentUser.avatarPicture.split("/");
        const publicIdWithExtension = urlParts.slice(-2).join("/");
        const publicId = publicIdWithExtension.split(".")[0];
        await deleteFromCloudinary(publicId);
        console.log("Old avatar deleted from Cloudinary");
      } catch (error) {
        console.error("Error deleting old avatar:", error);
      }
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Avatar updated successfully",
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    return NextResponse.json(
      {
        error: `Failed to upload avatar: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
