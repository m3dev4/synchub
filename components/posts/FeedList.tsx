"use client";

import { useFeed, useLoadMorePosts } from "@/hooks/posts/usePosts";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

export const FeedList = () => {
  const { data: feedData, isLoading, error, refetch } = useFeed();
  const loadMoreMutation = useLoadMorePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLoadMore = async () => {
    if (!feedData?.nextCursor) return;
    await loadMoreMutation.mutateAsync(feedData.nextCursor);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2 text-muted-foreground">
          Chargement du feed...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Erreur lors du chargement du feed</p>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      </div>
    );
  }

  if (!feedData?.posts || feedData.posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <div className="text-6xl">📝</div>
          <div>
            <h3 className="text-lg font-medium mb-2">Aucun post à afficher</h3>
            <p className="text-muted-foreground text-sm">
              Suivez des utilisateurs pour voir leurs posts dans votre feed !
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bouton de rafraîchissement */}
      <div className="flex justify-center">
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={isRefreshing}
          className="text-xs"
        >
          {isRefreshing ? (
            <Loader2 className="w-3 h-3 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-3 h-3 mr-2" />
          )}
          Actualiser
        </Button>
      </div>

      {/* Liste des posts */}
      <div className="space-y-4">
        {feedData.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Bouton charger plus */}
      {feedData.hasMore && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleLoadMore}
            disabled={loadMoreMutation.isPending}
            variant="outline"
          >
            {loadMoreMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Chargement...
              </>
            ) : (
              "Charger plus de posts"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
