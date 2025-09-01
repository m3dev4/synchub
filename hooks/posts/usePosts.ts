import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePostDto, Post, FeedResponse } from "@/types/posts";
import { toast } from "sonner";

// Hook pour créer un post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostDto) => {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Erreur lors de la création du post");
      return result;
    },
    onSuccess: (data) => {
      // Invalider le cache du feed pour afficher le nouveau post
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post publié avec succès !");
    },
    onError: (error) => {
      console.error("Erreur création post:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du post",
      );
    },
  });
};

// Hook pour récupérer un post par ID
export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async (): Promise<Post> => {
      const response = await fetch(`/api/posts/${postId}`);
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Erreur lors de la récupération du post",
        );
      return result;
    },
    enabled: !!postId,
  });
};

// Hook pour supprimer un post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Erreur lors de la suppression du post",
        );
      return result;
    },
    onSuccess: () => {
      // Invalider le cache du feed pour retirer le post supprimé
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post supprimé avec succès !");
    },
    onError: (error) => {
      console.error("Erreur suppression post:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du post",
      );
    },
  });
};

// Hook pour récupérer le feed avec pagination infinie
export const useFeed = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: async (): Promise<FeedResponse> => {
      const response = await fetch("/api/feed?limit=10");
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Erreur lors de la récupération du feed",
        );
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

// Hook pour charger plus de posts (pagination)
export const useLoadMorePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cursor: string): Promise<FeedResponse> => {
      const response = await fetch(`/api/feed?cursor=${cursor}&limit=10`);
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Erreur lors du chargement");
      return result;
    },
    onSuccess: (newData) => {
      // Mettre à jour le cache en ajoutant les nouveaux posts
      queryClient.setQueryData(
        ["feed"],
        (oldData: FeedResponse | undefined) => {
          if (!oldData) return newData;

          return {
            ...newData,
            posts: [...oldData.posts, ...newData.posts],
          };
        },
      );
    },
    onError: (error) => {
      console.error("Erreur chargement posts:", error);
      toast.error("Erreur lors du chargement des posts");
    },
  });
};
