import { useQuery } from "@tanstack/react-query";

export const useCommunityCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["community-categories"],
    queryFn: async () => {
      const response = await fetch("/api/communityTags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération des catégories",
        );
      }

      return result.data || [];
    },
    staleTime: 1000 * 60 * 60, // 1 heure
    gcTime: 1000 * 60 * 60 * 24, // 24 heures
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    categories,
    isLoading,
    error,
  };
};
