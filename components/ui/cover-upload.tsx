"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { useAuthStore } from "@/stores/auth/authState";
import { toast } from "sonner";
import Image from "next/image";

interface CoverUploadProps {
  currentCover?: string;
  onCoverUpdate?: (newCoverUrl: string) => void;
}

export function CoverUpload({ currentCover, onCoverUpdate }: CoverUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUser } = useAuthStore();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }

    // Vérifier la taille (10MB max pour les covers)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("La taille du fichier ne doit pas dépasser 10MB");
      return;
    }

    // Créer un aperçu
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload du fichier
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    if (!user?.id) {
      toast.error("Utilisateur non connecté");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("cover", file);

      const response = await fetch("/api/upload/cover", {
        method: "POST",
        headers: {
          "x-user-id": user.id,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'upload");
      }

      // Mettre à jour le store utilisateur
      updateUser({ coverPicture: result.user.coverPicture });

      // Callback pour le parent
      onCoverUpdate?.(result.user.coverPicture);

      toast.success("Photo de couverture mise à jour avec succès");
      setPreviewUrl(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de l'upload",
      );
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const cancelPreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-full h-48 group rounded-2xl overflow-hidden">
      {/* Image de couverture */}
      <Image
        src={
          previewUrl ||
          currentCover ||
          user?.coverPicture ||
          "https://via.placeholder.com/1200x400/e5e7eb/6b7280?text=Cover"
        }
        alt="Cover"
        fill
        className="object-cover transition-all duration-200 group-hover:opacity-80"
      />

      {/* Overlay avec boutons */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50">
        {previewUrl ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={cancelPreview}
              disabled={isUploading}
            >
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            onClick={triggerFileInput}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Upload...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-2" />
                Changer la couverture
              </>
            )}
          </Button>
        )}
      </div>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Indicateur de chargement */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="text-white text-sm">Upload en cours...</div>
        </div>
      )}
    </div>
  );
}
