import { useQuery } from "@tanstack/react-query";

export const useCommunityById = (id: string) => {
  const {
    data: community,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["community", id],
    queryFn: async () => {
      const response = await fetch(`/api/communities/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération de la communauté",
        );
      }
      return result.data || [];
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  return { community, isLoading, error };
};
