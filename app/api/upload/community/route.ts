import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    // Récupérer les données du formulaire
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const imageType = formData.get("type") as string; // "avatar" ou "banner"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!imageType || !["avatar", "banner"].includes(imageType)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 },
      );
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 },
      );
    }

    // Vérifier la taille du fichier (10MB max pour les bannières, 5MB pour les avatars)
    const maxSize = imageType === "banner" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size must be less than ${maxSize / (1024 * 1024)}MB` },
        { status: 400 },
      );
    }

    // Convertir le fichier en Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Déterminer le dossier Cloudinary selon le type
    const folder =
      imageType === "avatar"
        ? "synchub/communities/avatars"
        : "synchub/communities/banners";

    // Upload vers Cloudinary avec transformations appropriées
    const uploadResult = await uploadToCloudinary(buffer, folder, "image");

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      public_id: uploadResult.public_id,
      message: `${imageType === "avatar" ? "Avatar" : "Bannière"} uploaded successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
