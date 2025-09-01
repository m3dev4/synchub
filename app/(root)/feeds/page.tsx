"use client";

import { CreatePost } from "@/components/posts/CreatePost";
import { FeedList } from "@/components/posts/FeedList";

const Feeds = () => {
  return (
    <div className="min-h-screen bg-background py-6">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Feed</h1>
          <p className="text-muted-foreground text-sm">
            Découvrez les derniers posts de vos abonnements
          </p>
        </div>

        {/* Créer un post */}
        <CreatePost />

        {/* Feed des posts */}
        <FeedList />
      </div>
    </div>
  );
};

export default Feeds;
