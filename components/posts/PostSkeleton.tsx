"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostSkeleton = () => {
  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-card to-background overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-card/50 to-muted/20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-muted rounded-full border-2 border-background" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="space-y-4">
          {/* Contenu du post */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>

          {/* Image placeholder */}
          <Skeleton className="w-full h-64 rounded-xl" />

          {/* Section collaborateurs */}
          <div className="space-y-3 p-4 bg-gradient-to-r from-muted/30 to-background rounded-xl border border-border/50">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-background/80 rounded-full border border-border/50"
                >
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-3 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Réactions */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-transparent">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-6 rounded-full" />
                </div>

                {/* Commentaires */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="h-4 w-4" />
                </div>

                {/* Partage */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>

            {/* Section commentaires */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-5 w-6 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="flex gap-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-20 w-full rounded-xl" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-8 w-24 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const FeedSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};
