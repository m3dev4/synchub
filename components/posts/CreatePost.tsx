"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth/authState";
import { useCreatePost } from "@/hooks/posts/usePosts";
import type { CreatePostDto, Visibility } from "@/types/posts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Users,
  Lock,
  Send,
  ImageIcon,
  Video,
  Music,
  FileText,
  X,
  UserPlus,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { CollaboratorSelector } from "@/components/editor/CollaboratorSelector";
import type { CollaboratorRole } from "@/types/posts";
import { Badge } from "@/components/ui/badge";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("PUBLIC");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [collaborators, setCollaborators] = useState<
    Array<{
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      avatarPicture?: string;
      role: CollaboratorRole;
    }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const createPostMutation = useCreatePost();

  const handleFileSelect = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = getAcceptType(type);
      fileInputRef.current.click();
    }
  };

  const getAcceptType = (type: string) => {
    switch (type) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "audio":
        return "audio/*";
      case "document":
        return ".pdf,.doc,.docx,.txt";
      default:
        return "*/*";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await fetch("/api/upload/media", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erreur d'upload");
    }

    const result = await response.json();
    return result.media;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || createPostMutation.isPending) return;

    try {
      setUploading(true);

      let uploadedMedia = [];
      if (selectedFiles.length > 0) {
        uploadedMedia = await uploadFiles(selectedFiles);
      }

      const postData: CreatePostDto = {
        content: content.trim(),
        visibility,
        media: uploadedMedia,
        isCollaborative,
        collaboratorIds: isCollaborative ? collaborators.map((c) => c.id) : [],
      };

      await createPostMutation.mutateAsync(postData);

      toast.success("Post créé avec succès !");

      // Reset form
      setContent("");
      setVisibility("PUBLIC");
      setSelectedFiles([]);
      setIsCollaborative(false);
      setCollaborators([]);
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
      toast.error("Erreur lors de la création du post");
    } finally {
      setUploading(false);
    }
  };

  const getVisibilityIcon = (vis: Visibility) => {
    switch (vis) {
      case "PUBLIC":
        return <Globe className="w-4 h-4" />;
      case "FOLLOWERS_ONLY":
        return <Users className="w-4 h-4" />;
      case "PRIVATE":
        return <Lock className="w-4 h-4" />;
    }
  };

  const getVisibilityLabel = (vis: Visibility) => {
    switch (vis) {
      case "PUBLIC":
        return "Public";
      case "FOLLOWERS_ONLY":
        return "Abonnés seulement";
      case "PRIVATE":
        return "Privé";
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-card to-background overflow-hidden">
      <Toaster />
      <CardHeader className="pb-4 bg-gradient-to-r from-card/50 to-muted/20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-12 h-12 ring-2 ring-accent/20 ring-offset-2 ring-offset-background">
              <AvatarImage src={user?.avatarPicture || ""} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <p className="font-semibold text-base text-card-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm">@{user?.username}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Partagez vos pensées..."
              className="min-h-[140px] resize-none border-0 bg-muted/30 p-4 text-base placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent/50 rounded-xl pr-20 transition-all duration-200"
              maxLength={2000}
            />

            <div className="absolute bottom-4 right-4 flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => handleFileSelect("image")}
                title="Ajouter une image"
              >
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                onClick={() => handleFileSelect("video")}
                title="Ajouter une vidéo"
              >
                <Video className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                onClick={() => handleFileSelect("audio")}
                title="Ajouter un audio"
              >
                <Music className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                onClick={() => handleFileSelect("document")}
                title="Ajouter un document"
              >
                <FileText className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Input file caché */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          {selectedFiles.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-card-foreground">
                Fichiers sélectionnés
              </p>
              <div className="grid gap-3">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-background border border-border/50 rounded-lg group hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-accent/20 to-secondary/20">
                        {file.type.startsWith("image/") && (
                          <ImageIcon className="w-5 h-5 text-blue-600" />
                        )}
                        {file.type.startsWith("video/") && (
                          <Video className="w-5 h-5 text-green-600" />
                        )}
                        {file.type.startsWith("audio/") && (
                          <Music className="w-5 h-5 text-purple-600" />
                        )}
                        {!file.type.startsWith("image/") &&
                          !file.type.startsWith("video/") &&
                          !file.type.startsWith("audio/") && (
                            <FileText className="w-5 h-5 text-orange-600" />
                          )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-card-foreground">
                          {file.name}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-muted/30 to-background rounded-xl border">
            <Switch
              id="collaborative"
              checked={isCollaborative}
              onCheckedChange={setIsCollaborative}
              className="data-[state=checked]:bg-accent"
            />
            <Label
              htmlFor="collaborative"
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <UserPlus className="h-4 w-4 text-accent" />
              Post collaboratif
            </Label>
            {isCollaborative && (
              <Badge variant="secondary" className="ml-auto  border-accent/20">
                Activé
              </Badge>
            )}
          </div>

          {/* Sélecteur de collaborateurs */}
          {isCollaborative && (
            <CollaboratorSelector
              collaborators={collaborators}
              onCollaboratorsChange={setCollaborators}
              currentUserId={user?.id || ""}
              className="border-t pt-4"
            />
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4">
              <Select
                value={visibility}
                onValueChange={(value: Visibility) => setVisibility(value)}
              >
                <SelectTrigger className="w-auto border-0  p-0 h-auto  hover:text-foreground transition-colors">
                  <SelectValue>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                      {getVisibilityIcon(visibility)}
                      <span className="text-sm font-medium">
                        {getVisibilityLabel(visibility)}
                      </span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Public</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="FOLLOWERS_ONLY">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Abonnés seulement</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="PRIVATE">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Privé</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-1 rounded-full transition-colors ${
                    content.length > 1800
                      ? "bg-destructive"
                      : content.length > 1500
                        ? "bg-orange-500"
                        : "bg-accent"
                  }`}
                  style={{
                    width: `${Math.max(8, (content.length / 2000) * 32)}px`,
                  }}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    content.length > 1800
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {content.length}/2000
                </span>
              </div>

              <Button
                type="submit"
                disabled={
                  !content.trim() || createPostMutation.isPending || uploading
                }
                size="sm"
                className="min-w-[100px]  to-accent hover:from-primary/90 hover:to-accent/90  font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {createPostMutation.isPending || uploading ? (
                  <div className="w-4 h-4 border-2  border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Publier
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
