"use client";

import type React from "react";
import { useState } from "react";
import type { PostMedia } from "@/types/posts";
import { Download, FileText, Music, Video, Eye, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MediaDisplayProps {
  media: PostMedia[];
  className?: string;
}

export const MediaDisplay: React.FC<MediaDisplayProps> = ({
  media,
  className = "",
}) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  if (!media || media.length === 0) return null;

  const renderMedia = (item: PostMedia, index: number) => {
    switch (item.type) {
      case "IMAGE":
        return (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-card to-muted/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              src={item.url || "/placeholder.svg"}
              alt={item.filename || "Image"}
              className="w-full h-auto object-cover max-h-96 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {item.filename && (
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                {item.filename}
              </div>
            )}

            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
                onClick={() => setExpandedImage(item.url)}
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        );

      case "VIDEO":
        return (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-card to-muted/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <video
              src={item.url}
              controls
              className="w-full h-auto max-h-96 rounded-xl"
              preload="metadata"
            >
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-black/70 text-white border-0 backdrop-blur-sm"
              >
                <Video className="h-3 w-3 mr-1" />
                {item.duration &&
                  `${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, "0")}`}
              </Badge>
            </div>
          </div>
        );

      case "AUDIO":
        return (
          <div
            key={item.id}
            className="bg-gradient-to-r from-card to-muted/30 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center shadow-sm">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base text-card-foreground">
                  {item.filename || "Fichier Audio"}
                </p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  {item.duration && (
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {Math.floor(item.duration / 60)}:
                      {(item.duration % 60).toString().padStart(2, "0")}
                    </span>
                  )}
                  {item.size && (
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                      {(item.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  )}
                </div>
              </div>
            </div>
            <audio
              src={item.url}
              controls
              className="w-full h-10 rounded-lg"
              preload="metadata"
            >
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        );

      case "DOCUMENT":
        return (
          <div
            key={item.id}
            className="bg-gradient-to-r from-card to-muted/30 border border-border/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-muted to-border rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-card-foreground">
                    {item.filename || "Document"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.size && `${(item.size / 1024 / 1024).toFixed(1)} MB`}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.url, "_blank")}
                className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Organiser les médias par type pour un meilleur affichage
  const images = media.filter((m) => m.type === "IMAGE");
  const videos = media.filter((m) => m.type === "VIDEO");
  const audios = media.filter((m) => m.type === "AUDIO");
  const documents = media.filter((m) => m.type === "DOCUMENT");

  return (
    <div className={`space-y-6 ${className}`}>
      {images.length > 0 && (
        <div
          className={`grid gap-3 ${
            images.length === 1
              ? "grid-cols-1"
              : images.length === 2
                ? "grid-cols-2"
                : images.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2"
          }`}
        >
          {images.slice(0, 4).map(renderMedia)}
          {images.length > 4 && (
            <div className="relative bg-gradient-to-br from-muted to-border rounded-xl aspect-square flex items-center justify-center group cursor-pointer hover:from-accent/20 hover:to-accent/10 transition-all duration-300">
              <div className="text-center">
                <Eye className="h-6 w-6 text-muted-foreground mx-auto mb-2 group-hover:text-accent transition-colors" />
                <span className="text-muted-foreground font-medium group-hover:text-accent transition-colors">
                  +{images.length - 4} autres
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vidéos */}
      {videos.length > 0 && (
        <div className="space-y-4">{videos.map(renderMedia)}</div>
      )}

      {/* Audio */}
      {audios.length > 0 && (
        <div className="space-y-4">{audios.map(renderMedia)}</div>
      )}

      {/* Documents */}
      {documents.length > 0 && (
        <div className="space-y-3">{documents.map(renderMedia)}</div>
      )}

      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage || "/placeholder.svg"}
            alt="Image agrandie"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
