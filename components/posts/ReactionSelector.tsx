"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ReactionType, ReactionSummary } from "@/types/posts";
import { toast } from "sonner";

interface ReactionSelectorProps {
  postId: string;
  reactions: ReactionSummary[];
  userReaction?: ReactionType;
  onReactionChange?: (
    reactions: ReactionSummary[],
    userReaction?: ReactionType,
  ) => void;
  className?: string;
}

const reactionEmojis: Record<ReactionType, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  LAUGH: "😂",
  WOW: "😮",
  SAD: "😢",
  ANGRY: "😠",
};

const reactionLabels: Record<ReactionType, string> = {
  LIKE: "J'aime",
  LOVE: "J'adore",
  LAUGH: "Hilarant",
  WOW: "Wow",
  SAD: "Triste",
  ANGRY: "En colère",
};

const reactionColors: Record<ReactionType, string> = {
  LIKE: "hover:bg-blue-50 hover:text-blue-600 hover:scale-110",
  LOVE: "hover:bg-red-50 hover:text-red-600 hover:scale-110",
  LAUGH: "hover:bg-yellow-50 hover:text-yellow-600 hover:scale-110",
  WOW: "hover:bg-purple-50 hover:text-purple-600 hover:scale-110",
  SAD: "hover:bg-gray-50 hover:text-gray-600 hover:scale-110",
  ANGRY: "hover:bg-orange-50 hover:text-orange-600 hover:scale-110",
};

export const ReactionSelector: React.FC<ReactionSelectorProps> = ({
  postId,
  reactions,
  userReaction,
  onReactionChange,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [animatingReaction, setAnimatingReaction] =
    useState<ReactionType | null>(null);

  const handleReaction = async (type: ReactionType) => {
    if (isLoading) return;

    setAnimatingReaction(type);
    setTimeout(() => setAnimatingReaction(null), 300);

    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/${postId}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la réaction");
      }

      const result = await response.json();

      // Mettre à jour les réactions localement
      const newReactions = [...reactions];
      let newUserReaction = userReaction;

      if (result.action === "added") {
        newUserReaction = type;
        // Ajouter ou incrémenter la réaction
        const existingIndex = newReactions.findIndex((r) => r.type === type);
        if (existingIndex >= 0) {
          newReactions[existingIndex].count += 1;
        } else {
          newReactions.push({ type, count: 1 });
        }
        // Décrémenter l'ancienne réaction si elle existait
        if (userReaction) {
          const oldIndex = newReactions.findIndex(
            (r) => r.type === userReaction,
          );
          if (oldIndex >= 0) {
            newReactions[oldIndex].count -= 1;
            if (newReactions[oldIndex].count === 0) {
              newReactions.splice(oldIndex, 1);
            }
          }
        }
      } else {
        newUserReaction = undefined;
        // Décrémenter la réaction
        const existingIndex = newReactions.findIndex((r) => r.type === type);
        if (existingIndex >= 0) {
          newReactions[existingIndex].count -= 1;
          if (newReactions[existingIndex].count === 0) {
            newReactions.splice(existingIndex, 1);
          }
        }
      }

      onReactionChange?.(newReactions, newUserReaction);
      setShowReactions(false);
    } catch (error) {
      console.error("Erreur lors de la réaction:", error);
      toast.error("Erreur lors de la réaction");
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalReactions = () => {
    return reactions.reduce((total, reaction) => total + reaction.count, 0);
  };

  const getMostPopularReaction = () => {
    if (reactions.length === 0) return null;
    return reactions.reduce((max, reaction) =>
      reaction.count > max.count ? reaction : max,
    );
  };

  const totalReactions = getTotalReactions();
  const mostPopular = getMostPopularReaction();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Popover open={showReactions} onOpenChange={setShowReactions}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md ${
              userReaction
                ? `bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 hover:from-primary/20 hover:to-accent/20`
                : "text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20"
            }`}
            disabled={isLoading}
          >
            <span
              className={`text-lg transition-transform duration-200 ${
                animatingReaction
                  ? "animate-reaction-bounce"
                  : "group-hover:scale-110"
              }`}
            >
              {userReaction ? reactionEmojis[userReaction] : "👍"}
            </span>
            <span className="text-sm font-medium">
              {userReaction ? reactionLabels[userReaction] : "J'aime"}
            </span>
            {totalReactions > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 text-xs bg-primary/10 text-primary border-0 animate-pulse-ring"
              >
                {totalReactions}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-3 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl animate-slide-up"
          align="start"
        >
          <div className="flex items-center gap-2">
            {Object.entries(reactionEmojis).map(([type, emoji]) => (
              <Button
                key={type}
                variant="ghost"
                size="sm"
                className={`h-12 w-12 p-0 text-2xl transition-all duration-200 reaction-hover rounded-full ${
                  reactionColors[type as ReactionType]
                } ${userReaction === type ? "bg-primary/10 text-primary scale-110 shadow-lg" : ""} ${
                  animatingReaction === type ? "animate-reaction-bounce" : ""
                }`}
                onClick={() => handleReaction(type as ReactionType)}
                disabled={isLoading}
                title={reactionLabels[type as ReactionType]}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {reactions.length > 0 && (
        <div className="flex items-center gap-2">
          {reactions
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map((reaction) => (
              <div
                key={reaction.type}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs border border-border/50 hover:bg-muted/70 transition-colors duration-200"
              >
                <span className="text-sm">{reactionEmojis[reaction.type]}</span>
                <span className="font-semibold text-foreground">
                  {reaction.count}
                </span>
              </div>
            ))}
          {reactions.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              +{reactions.length - 3}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
