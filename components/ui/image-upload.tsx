"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  type: "avatar" | "banner";
  className?: string;
  maxSizeMB?: number;
  disabled?: boolean;
}

export const ImageUpload = ({
  label,
  value,
  onChange,
  type,
  className = "",
  maxSizeMB = type === "banner" ? 10 : 5,
  disabled = false,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifications côté client
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`L'image ne doit pas dépasser ${maxSizeMB}MB`);
      return;
    }

    // Prévisualisation immédiate
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", type);

      const response = await fetch("/api/upload/community", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Erreur lors de l'upload");
      }

      onChange(result.url);
      setPreview(result.url);
      toast.success(
        `${type === "avatar" ? "Avatar" : "Bannière"} uploadé avec succès !`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de l'upload",
      );

      // Restaurer l'ancienne image en cas d'erreur
      setPreview(value || null);

      // Nettoyer la prévisualisation temporaire
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    } finally {
      setIsUploading(false);
      // Reset input file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const getPlaceholderDimensions = () => {
    return type === "avatar"
      ? "w-24 h-24 rounded-full"
      : "w-full h-32 rounded-lg";
  };

  const getImageDimensions = () => {
    return type === "avatar"
      ? {
          width: 96,
          height: 96,
          className: "w-24 h-24 rounded-full object-cover",
        }
      : {
          width: 300,
          height: 128,
          className: "w-full h-32 rounded-lg object-cover",
        };
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium">{label}</Label>

      <div className="space-y-2">
        {/* Zone d'affichage/upload */}
        <div
          onClick={handleClick}
          className={`
            relative border-2 border-dashed border-gray-300 hover:border-gray-400
            transition-colors cursor-pointer group
            ${getPlaceholderDimensions()}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${isUploading ? "border-blue-400" : ""}
          `}
        >
          {preview ? (
            <div className="relative w-full h-full">
              <Image
                src={preview}
                alt={`${type} preview`}
                {...getImageDimensions()}
              />

              {/* Overlay avec actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center rounded-lg">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                    disabled={disabled || isUploading}
                  >
                    <Upload className="w-3 h-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    disabled={disabled || isUploading}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin mb-1" />
                  <span className="text-xs">Upload...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 mb-1" />
                  <span className="text-xs text-center">
                    {type === "avatar" ? "Avatar" : "Bannière"}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={disabled || isUploading}
            className="flex-1"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Upload...
              </>
            ) : (
              <>
                <Upload className="w-3 h-3 mr-1" />
                Choisir
              </>
            )}
          </Button>

          {preview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={disabled || isUploading}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Informations sur les limites */}
        <p className="text-xs text-gray-500">
          Max {maxSizeMB}MB • JPG, PNG, WebP
        </p>
      </div>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  );
};

export default ImageUpload;
