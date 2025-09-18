import { useQuery } from "@tanstack/react-query";

export const useChannelById = (channelId: string, communityId: string) => {
  const {
    data: channel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      const response = await fetch(
        `/api/communities/${communityId}/channels/${channelId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Une erreur est survenue");
      }
      return result.data || [];
    },
    enabled: !!channelId && !!communityId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  return { channel, isLoading, error };
};
