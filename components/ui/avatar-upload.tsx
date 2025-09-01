"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Upload, X } from "lucide-react";
import { useAuthStore } from "@/stores/auth/authState";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentAvatar?: string;
  userName?: string;
  onAvatarUpdate?: (newAvatarUrl: string) => void;
  size?: "sm" | "md" | "lg";
}

export function AvatarUpload({
  currentAvatar,
  userName,
  onAvatarUpdate,
  size = "md",
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUser } = useAuthStore();

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }

    // Vérifier la taille (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La taille du fichier ne doit pas dépasser 5MB");
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
      formData.append("avatar", file);

      const response = await fetch("/api/upload/avatar", {
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
      updateUser({ avatarPicture: result.user.avatarPicture });

      // Callback pour le parent
      onAvatarUpdate?.(result.user.avatarPicture);

      toast.success("Photo de profil mise à jour avec succès");
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
    <div className="relative group">
      <Avatar
        className={`${sizeClasses[size]} cursor-pointer transition-all duration-200 group-hover:opacity-80`}
      >
        <AvatarImage
          src={
            previewUrl ||
            currentAvatar ||
            user?.avatarPicture ||
            "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=Avatar"
          }
          alt={userName || user?.firstName || "Avatar"}
        />
        <AvatarFallback>
          {userName?.charAt(0).toUpperCase() ||
            (user?.firstName?.charAt(0).toUpperCase() || "") +
              (user?.lastName?.charAt(0).toUpperCase() || "")}
        </AvatarFallback>
      </Avatar>

      {/* Overlay avec boutons */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 rounded-full">
        {previewUrl ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={cancelPreview}
              disabled={isUploading}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="h-8 w-8 p-0"
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera className="w-4 h-4" />
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
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
          <div className="text-white text-xs">Upload...</div>
        </div>
      )}
    </div>
  );
}
