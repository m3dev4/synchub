"use client";

import { useInfiniteFeed } from "@/hooks/posts/usePosts";
import { PostCard } from "./PostCard";
import { PostSkeleton, FeedSkeleton } from "./PostSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export const FeedList = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteFeed();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Flatten all posts from all pages
  const allPosts = useMemo(() => {
    return data?.pages.flatMap((page) => page.posts) ?? [];
  }, [data]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return <FeedSkeleton count={5} />;
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

  if (!allPosts || allPosts.length === 0) {
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
      <div className="space-y-6">
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Trigger pour le scroll infini */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center pt-6">
          {isFetchingNextPage ? (
            <FeedSkeleton count={2} />
          ) : (
            <div className="h-4" /> // Invisible trigger
          )}
        </div>
      )}

      {/* Indicateur de fin */}
      {!hasNextPage && allPosts.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="text-2xl mb-2">🎉</div>
          <p className="text-sm font-medium">Vous avez vu tous les posts !</p>
          <p className="text-xs">Revenez plus tard pour de nouveaux contenus</p>
        </div>
      )}
    </div>
  );
};
