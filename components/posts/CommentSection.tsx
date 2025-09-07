"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Comment } from "@/types/posts";
import { useAuthStore } from "@/stores/auth/authState";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  MessageCircle,
  Reply,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  commentCount: number;
  onCommentsUpdate?: (comments: Comment[], count: number) => void;
  className?: string;
}

interface CommentItemProps {
  comment: Comment;
  postId: string;
  onReply?: (parentId: string, content: string) => void;
  level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  postId,
  onReply,
  level = 0,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(level < 2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  const handleReply = async () => {
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onReply?.(comment.id, replyContent.trim());
      setReplyContent("");
      setShowReplyForm(false);
      toast.success("Réponse ajoutée");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la réponse");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr,
    });
  };

  const processContent = (content: string) => {
    return content.replace(
      /@(\w+)/g,
      "<span class='text-primary font-semibold bg-primary/10 px-1 py-0.5 rounded'>@$1</span>",
    );
  };

  return (
    <div
      className={`${level > 0 ? "ml-6 mt-3 pl-4 border-l-2 border-border/30" : "mt-4"} animate-slide-up`}
    >
      <div className="flex gap-3">
        <Avatar
          className={`${level > 0 ? "w-7 h-7" : "w-9 h-9"} flex-shrink-0 ring-2 ring-border/50 hover:ring-primary/30 transition-all duration-200`}
        >
          <AvatarImage src={comment.user.avatarPicture || "/placeholder.svg"} />
          <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20 font-semibold">
            {comment.user.firstName.charAt(0)}
            {comment.user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <Card
            className={`${level > 0 ? "bg-muted/20" : "bg-card/50"} backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            <CardContent className={`${level > 0 ? "p-3" : "p-4"}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-sm text-card-foreground">
                  {comment.user.firstName} {comment.user.lastName}
                </span>
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                  @{comment.user.username}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <div
                className="text-sm leading-relaxed text-card-foreground"
                dangerouslySetInnerHTML={{
                  __html: processContent(comment.content),
                }}
              />
            </CardContent>
          </Card>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="h-8 px-3 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200"
            >
              <Reply className="w-3.5 h-3.5 mr-1.5" />
              Répondre
            </Button>

            {comment.replies && comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplies(!showReplies)}
                className="h-8 px-3 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200"
              >
                {showReplies ? (
                  <ChevronUp className="w-3.5 h-3.5 mr-1.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 mr-1.5" />
                )}
                {comment.replies.length} réponse
                {comment.replies.length > 1 ? "s" : ""}
              </Button>
            )}
          </div>

          {showReplyForm && (
            <div className="flex gap-3 mt-3 animate-slide-up">
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarImage src={user?.avatarPicture || "/placeholder.svg"} />
                <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={`Répondre à ${comment.user.firstName}...`}
                  className="min-h-[70px] text-sm resize-none bg-input/50 border-border/50 focus:bg-input focus:border-primary/50 transition-all duration-200"
                  maxLength={1000}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {replyContent.length}/1000
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowReplyForm(false);
                        setReplyContent("");
                      }}
                      className="h-8 text-xs hover:bg-muted/50"
                    >
                      Annuler
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleReply}
                      disabled={!replyContent.trim() || isSubmitting}
                      className="h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSubmitting ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3 h-3 mr-1.5" />
                          Répondre
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className="space-y-1 mt-2">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  onReply={onReply}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  commentCount,
  onCommentsUpdate,
  className = "",
}) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [localCount, setLocalCount] = useState(commentCount);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuthStore();

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du commentaire");
      }

      const result = await response.json();

      const updatedComments = [result.comment, ...localComments];
      const updatedCount = localCount + 1;

      setLocalComments(updatedComments);
      setLocalCount(updatedCount);
      onCommentsUpdate?.(updatedComments, updatedCount);

      setNewComment("");
      setShowComments(true);
      toast.success("Commentaire ajouté");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      toast.error("Erreur lors de l'ajout du commentaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, parentId }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la réponse");
      }

      const result = await response.json();

      // Recharger tous les commentaires pour s'assurer de la cohérence
      const commentsResponse = await fetch(`/api/posts/${postId}/comments`);
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        setLocalComments(commentsData.comments);
        setLocalCount(commentsData.totalComments);
        onCommentsUpdate?.(commentsData.comments, commentsData.totalComments);
      }
    } catch (error) {
      throw error;
    }
  };

  const loadComments = async () => {
    if (localComments.length === 0) {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setLocalComments(data.comments);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires:", error);
      }
    }
    setShowComments(!showComments);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={loadComments}
        className="flex items-center gap-3 px-4 py-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
      >
        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary border-0"
        >
          {localCount}
        </Badge>
        <span className="text-sm font-medium">
          {showComments ? "Masquer" : "Voir"} les commentaires
        </span>
      </Button>

      <div className="flex gap-3">
        <Avatar className="w-9 h-9 flex-shrink-0 ring-2 ring-border/50">
          <AvatarImage src={user?.avatarPicture || "/placeholder.svg"} />
          <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20 font-semibold">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            ref={textareaRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez un commentaire... (utilisez @username pour mentionner quelqu'un)"
            className="min-h-[90px] resize-none bg-card/50 border-border/50 focus:bg-card focus:border-primary/50 transition-all duration-200 text-pretty"
            maxLength={2000}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {newComment.length}/2000
            </span>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
              className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Commenter
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="space-y-2 max-h-[500px] overflow-y-auto animate-slide-up">
          {localComments.length > 0 ? (
            localComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                onReply={handleReply}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm font-medium mb-1">
                Aucun commentaire pour le moment
              </p>
              <p className="text-xs">Soyez le premier à commenter !</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
