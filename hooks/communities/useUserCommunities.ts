import { useQuery } from "@tanstack/react-query";

export const useUserCommunities = () => {
  const { data: userCommunities, isLoading, error } = useQuery({
    queryKey: ["user-communities"],
    queryFn: async () => {
      const response = await fetch("/api/communities/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération de vos communautés"
        );
      }

      return result.data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    userCommunities,
    isLoading,
    error,
  };
};
