"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  PostWithAuthor,
  CollaboratorRole,
  ReactionSummary,
  ReactionType,
} from "@/types/posts";
import { useEffect } from "react";
import { useDeletePost } from "@/hooks/posts/usePosts";
import { useAuthStore } from "@/stores/auth/authState";
import { formatDistanceToNow } from "date-fns";
import { Crown, Edit, Eye, Share2, MessageCircle } from "lucide-react";
import { fr } from "date-fns/locale";
import { ReactionSelector } from "./ReactionSelector";
import { CommentSection } from "./CommentSection";
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
  const [reactions, setReactions] = useState<ReactionSummary[]>([]);
  const [userReaction, setUserReaction] = useState<ReactionType | undefined>();
  const [comments, setComments] = useState<any[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingReactions, setIsLoadingReactions] = useState(true);

  // Charger les réactions au montage du composant
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const response = await fetch(`/api/posts/${post.id}/reactions`);
        if (response.ok) {
          const data = await response.json();
          setReactions(data.reactions || []);
          setUserReaction(data.userReaction);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des réactions:", error);
      } finally {
        setIsLoadingReactions(false);
      }
    };

    loadReactions();
  }, [post.id]);

  // Initialiser le compteur de commentaires depuis les données du post
  useEffect(() => {
    if (post._count?.comments) {
      setCommentCount(post._count.comments);
    }
  }, [post._count?.comments]);

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
    <Card className="w-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-background overflow-hidden group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/profile/${post.author.id}`}>
              <div className="relative">
                <Avatar className="w-12 h-12 cursor-pointer hover:ring-2 hover:ring-accent/30 ring-offset-2 ring-offset-background transition-all duration-200">
                  <AvatarImage
                    src={post.author.avatarPicture || "/placeholder.svg"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                    {post.author.firstName?.[0]}
                    {post.author.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
              </div>
            </Link>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Link
                  href={`/profile/${post.author.id}`}
                  className="font-semibold text-base hover:text-accent transition-colors duration-200"
                >
                  {post.author.firstName} {post.author.lastName}
                </Link>

                {!isOwnPost && (
                  <Badge
                    variant={post.author.isFollowing ? "default" : "outline"}
                    className={`text-xs ${
                      post.author.isFollowing
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "border-accent/30 text-accent hover:bg-accent/10"
                    }`}
                  >
                    {post.author.isFollowing ? (
                      <>
                        <UserCheck className="w-3 h-3 mr-1" />
                        Suivi
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3 mr-1" />
                        Suivre
                      </>
                    )}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span className="hover:text-accent transition-colors cursor-pointer">
                  @{post.author.username}
                </span>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>{formatDate(post.createdAt)}</span>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <div className="flex items-center gap-1">
                  {getVisibilityIcon()}
                  <span className="text-xs">
                    {post.visibility.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {isOwnPost && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-muted"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="space-y-4">
          <p className="text-base leading-relaxed whitespace-pre-wrap text-card-foreground">
            {post.content}
          </p>

          {post.media && post.media.length > 0 && (
            <div className="rounded-xl overflow-hidden shadow-sm">
              <img
                src={post.media[0].url || "/placeholder.svg"}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {post.isCollaborative &&
            post.collaborators &&
            post.collaborators.length > 0 && (
              <div className="space-y-3 p-4 bg-gradient-to-r from-muted/30 to-background rounded-xl border border-border/50">
                <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <UserPlus className="h-4 w-4 text-accent" />
                  <span>Collaboration avec :</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.collaborators.map((collab) => {
                    const roleIcons = {
                      OWNER: Crown,
                      EDITOR: Edit,
                      CONTRIBUTOR: UserPlus,
                      VIEWER: Eye,
                    };
                    const RoleIcon = roleIcons[collab.role as CollaboratorRole];
                    return (
                      <div
                        key={collab.id}
                        className="flex items-center gap-2 px-3 py-2 bg-background/80 rounded-full border border-border/50 hover:border-accent/30 transition-colors duration-200"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={
                              collab.user.avatarPicture || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20">
                            {collab.user.firstName.charAt(0)}
                            {collab.user.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {collab.user.firstName} {collab.user.lastName}
                        </span>
                        <RoleIcon className="h-3 w-3 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          <div className="space-y-4 pt-3 border-t border-border/50">
            {/* Actions principales */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ReactionSelector
                  postId={post.id}
                  reactions={reactions}
                  userReaction={userReaction}
                  onReactionChange={(newReactions, newUserReaction) => {
                    setReactions(newReactions);
                    setUserReaction(newUserReaction);
                  }}
                />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{commentCount}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Partager</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="px-3 py-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </Button>
            </div>

            {/* Section des commentaires */}
            <CommentSection
              postId={post.id}
              comments={comments}
              commentCount={commentCount}
              onCommentsUpdate={(newComments, newCount) => {
                setComments(newComments);
                setCommentCount(newCount);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
