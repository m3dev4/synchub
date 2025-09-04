import { v2 as cloudinary } from "cloudinary";

// Configuration Cloudinary avec validation
const cloudName = process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("❌ Variables d'environnement Cloudinary manquantes:");
  console.error("CLOUDINARY_NAME:", cloudName ? "✅" : "❌");
  console.error("CLOUDINARY_API_KEY:", apiKey ? "✅" : "❌");
  console.error("CLOUDINARY_API_SECRET:", apiSecret ? "✅" : "❌");
  console.error("Créez un fichier .env.local avec vos clés Cloudinary");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;

// Fonction utilitaire pour uploader des médias (images, vidéos, audio, documents)
export const uploadToCloudinary = async (
  file: Buffer,
  folder: string = "synchub/avatars",
  resourceType: "image" | "video" | "raw" | "auto" = "auto",
): Promise<{
  url: string;
  public_id: string;
  format?: string;
  resource_type?: string;
  bytes?: number;
  duration?: number;
}> => {
  // Vérifier la configuration avant l'upload
  if (!cloudName || !apiKey || !apiSecret) {
    console.error("❌ Configuration Cloudinary manquante lors de l'upload:");
    console.error("CLOUDINARY_NAME:", cloudName || "MANQUANT");
    console.error("CLOUDINARY_API_KEY:", apiKey || "MANQUANT");
    console.error("CLOUDINARY_API_SECRET:", apiSecret || "MANQUANT");
    throw new Error(
      "Configuration Cloudinary manquante. Vérifiez votre fichier .env.local",
    );
  }

 

  return new Promise((resolve, reject) => {
    // Configuration selon le type de média et dossier
    const isAvatar = folder.includes("avatars");
    const isImage = resourceType === "image" || resourceType === "auto";

    let transformation: any[] = [];
    let uploadOptions: any = {
      resource_type: resourceType,
      folder: folder,
    };

    // Transformations pour les images seulement
    if (isImage) {
      transformation = isAvatar
        ? [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto", fetch_format: "auto" },
          ]
        : [
            { width: 1200, height: 800, crop: "limit" },
            { quality: "auto", fetch_format: "auto" },
          ];
      uploadOptions.transformation = transformation;
    }

    // Options spéciales pour vidéos
    if (resourceType === "video") {
      uploadOptions.resource_type = "video";
      uploadOptions.eager = [
        { width: 640, height: 480, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 120,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ];
    }

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes,
            duration: result.duration,
          });
        } else {
          reject(new Error("Upload failed"));
        }
      })
      .end(file);
  });
};

// Fonction pour supprimer une image
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
