"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  X,
  Image,
  Video,
  Music,
  FileText,
  Loader2,
} from "lucide-react";
import { MediaType } from "@/types/posts";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  file: File;
  type: MediaType;
  url?: string;
  publicId?: string;
  uploading?: boolean;
  progress?: number;
}

interface MediaUploaderProps {
  onMediaChange: (media: MediaFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // en MB
  acceptedTypes?: string[];
  className?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onMediaChange,
  maxFiles = 10,
  maxSize = 50,
  acceptedTypes = [
    "image/*",
    "video/*",
    "audio/*",
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
  ],
  className = "",
}) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const getMediaType = (file: File): MediaType => {
    if (file.type.startsWith("image/")) return "IMAGE";
    if (file.type.startsWith("video/")) return "VIDEO";
    if (file.type.startsWith("audio/")) return "AUDIO";
    return "DOCUMENT";
  };

  const getMediaIcon = (type: MediaType) => {
    switch (type) {
      case "IMAGE":
        return Image;
      case "VIDEO":
        return Video;
      case "AUDIO":
        return Music;
      case "DOCUMENT":
        return FileText;
      default:
        return FileText;
    }
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `Fichier trop volumineux (max ${maxSize}MB)`;
    }
    return null;
  };

  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/upload/media", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur d&apos;upload");
      }

      const result = await response.json();
      return result.media;
    } catch (error) {
      console.error("Erreur upload:", error);
      throw error;
    }
  };

  const handleFileSelect = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      if (mediaFiles.length + fileArray.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} fichiers autorisés`);
        return;
      }

      // Validation des fichiers
      const validFiles: File[] = [];
      for (const file of fileArray) {
        const error = validateFile(file);
        if (error) {
          toast.error(`${file.name}: ${error}`);
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length === 0) return;

      // Créer les objets MediaFile temporaires
      const newMediaFiles: MediaFile[] = validFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: getMediaType(file),
        uploading: true,
        progress: 0,
      }));

      setMediaFiles((prev) => [...prev, ...newMediaFiles]);

      try {
        // Upload des fichiers
        const uploadedMedia = await uploadFiles(validFiles);

        // Mettre à jour avec les URLs
        setMediaFiles((prev) =>
          prev.map((media) => {
            const uploaded = uploadedMedia.find(
              (u: any) => u.filename === media.file.name,
            );
            if (uploaded && media.uploading) {
              return {
                ...media,
                url: uploaded.url,
                publicId: uploaded.publicId,
                uploading: false,
                progress: 100,
              };
            }
            return media;
          }),
        );

        toast.success(`${validFiles.length} fichier(s) uploadé(s)`);
      } catch (error) {
        toast.error("Erreur lors de l&apos;upload");
        // Supprimer les fichiers en erreur
        setMediaFiles((prev) =>
          prev.filter(
            (media) => !newMediaFiles.some((nm) => nm.id === media.id),
          ),
        );
      }
    },
    [mediaFiles, maxFiles, maxSize],
  );

  const removeFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((media) => media.id !== id));
  };

  // Mettre à jour le parent quand les médias changent
  React.useEffect(() => {
    onMediaChange(mediaFiles);
  }, [mediaFiles, onMediaChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone de drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Glissez-déposez vos fichiers ici ou
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.accept = acceptedTypes.join(",");
            input.onchange = (e) => {
              const files = (e.target as HTMLInputElement).files;
              if (files) handleFileSelect(files);
            };
            input.click();
          }}
        >
          Sélectionner des fichiers
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          Max {maxFiles} fichiers, {maxSize}MB par fichier
        </p>
      </div>

      {/* Liste des fichiers */}
      {mediaFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">
            Fichiers sélectionnés ({mediaFiles.length})
          </h4>
          {mediaFiles.map((media) => {
            const Icon = getMediaIcon(media.type);
            return (
              <div
                key={media.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <Icon className="h-5 w-5 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {media.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {media.type} • {(media.file.size / 1024 / 1024).toFixed(1)}
                    MB
                  </p>
                  {media.uploading && (
                    <Progress
                      value={media.progress || 0}
                      className="h-1 mt-1"
                    />
                  )}
                </div>
                {media.uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(media.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
