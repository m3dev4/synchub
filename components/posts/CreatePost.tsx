"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreatePost } from "@/hooks/posts/usePosts";
import { useAuthStore } from "@/stores/auth/authState";
import { Visibility } from "@/types/posts";
import { ImageIcon, Globe, Users, Lock, Send } from "lucide-react";
import { toast, Toaster } from "sonner";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("PUBLIC");
  const { user } = useAuthStore();
  const createPostMutation = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || createPostMutation.isPending) return;

    try {
      await createPostMutation.mutateAsync({
        content: content.trim(),
        visibility,
      });

      toast.success("Post créé avec succès !");

      // Reset form seulement si succès
      setContent("");
      setVisibility("PUBLIC");
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
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
    <Card className="w-full">
      <Toaster />
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatarPicture || ""} />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">@{user?.username}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Quoi de neuf ?"
            className="min-h-[120px] resize-none border-0 p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
            maxLength={2000}
          />

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                disabled
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Média
              </Button>

              <Select
                value={visibility}
                onValueChange={(value: Visibility) => setVisibility(value)}
              >
                <SelectTrigger className="w-auto border-0 bg-transparent p-0 h-auto text-muted-foreground hover:text-foreground">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {getVisibilityIcon(visibility)}
                      <span className="text-sm">
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

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {content.length}/2000
              </span>
              <Button
                type="submit"
                disabled={!content.trim() || createPostMutation.isPending}
                size="sm"
                className="min-w-[80px]"
              >
                {createPostMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
