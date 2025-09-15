import { useQuery } from "@tanstack/react-query"

//Get all communities
export const useCommunity = () => {
  const { data: communities, isLoading, error } = useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      const response = await fetch("/api/communities/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération des communautés",
        );
      }
      return result.data || [];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    communities,
    isLoading,
    error,
  };
};
