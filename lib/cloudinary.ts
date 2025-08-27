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

// Fonction utilitaire pour uploader une image
export const uploadToCloudinary = async (
  file: Buffer,
  folder: string = "synchub/avatars",
): Promise<{ url: string; public_id: string }> => {
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

  console.log("🔧 Configuration Cloudinary:");
  console.log("Cloud Name:", cloudName);
  console.log("API Key:", apiKey?.substring(0, 8) + "...");
  console.log("API Secret:", apiSecret ? "Défini" : "Manquant");

  return new Promise((resolve, reject) => {
    // Configuration différente selon le type d'image
    const isAvatar = folder.includes("avatars");
    const transformation = isAvatar
      ? [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" },
        ]
      : [
          { width: 1200, height: 400, crop: "fill", gravity: "center" },
          { quality: "auto", fetch_format: "auto" },
        ];

    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: folder,
          transformation: transformation,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else if (result) {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          } else {
            reject(new Error("Upload failed"));
          }
        },
      )
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
