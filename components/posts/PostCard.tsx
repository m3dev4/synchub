"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostWithAuthor } from "@/types/posts";
import { useDeletePost } from "@/hooks/posts/usePosts";
import { useAuthStore } from "@/stores/auth/authState";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  MoreHorizontal,
  Trash2,
  Globe,
  Users,
  Lock,
  UserPlus,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  post: PostWithAuthor;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { user: currentUser } = useAuthStore();
  const deletePostMutation = useDeletePost();
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwnPost = currentUser?.id === post.authorId;

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) return;

    setIsDeleting(true);
    try {
      await deletePostMutation.mutateAsync(post.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const getVisibilityIcon = () => {
    switch (post.visibility) {
      case "PUBLIC":
        return <Globe className="w-3 h-3 text-muted-foreground" />;
      case "FOLLOWERS_ONLY":
        return <Users className="w-3 h-3 text-muted-foreground" />;
      case "PRIVATE":
        return <Lock className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr,
    });
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/profile/${post.author.id}`}>
              <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarImage src={post.author.avatarPicture} />
                <AvatarFallback>
                  {post.author.firstName?.[0]}
                  {post.author.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link
                  href={`/profile/${post.author.id}`}
                  className="font-medium text-sm hover:underline"
                >
                  {post.author.firstName} {post.author.lastName}
                </Link>
                {!isOwnPost && (
                  <div className="flex items-center gap-1">
                    {post.author.isFollowing ? (
                      <UserCheck className="w-3 h-3 text-green-500" />
                    ) : (
                      <UserPlus className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>@{post.author.username}</span>
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
                <span>•</span>
                {getVisibilityIcon()}
              </div>
            </div>
          </div>

          {isOwnPost && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {post.media && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.media}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Actions futures : likes, commentaires, partages */}
          <div className="flex items-center gap-4 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="text-muted-foreground"
            >
              ♥ 0
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="text-muted-foreground"
            >
              💬 0
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="text-muted-foreground"
            >
              🔄 0
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
