import { useQuery } from "@tanstack/react-query";

export const useChannels = (communityId: string) => {
  const {
    data: channels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["channels", communityId],
    queryFn: async () => {
      const response = await fetch(`/api/communities/${communityId}/channels`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération des channels",
        );
      }
      return result.data || [];
    },
    enabled: !!communityId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  return { channels, isLoading, error };
};
