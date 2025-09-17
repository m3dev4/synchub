import { useQuery } from "@tanstack/react-query";

export const useCommunityMembership = (communityId: string) => {
  const { data: membership, isLoading, error } = useQuery({
    queryKey: ["community-membership", communityId],
    queryFn: async () => {
      const response = await fetch(`/api/communities/${communityId}/membership`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          return { isMember: false, isOwner: false, canJoin: false };
        }
        throw new Error(result.message || "Erreur lors de la vérification");
      }

      return result.data || { isMember: false, isOwner: false, canJoin: true };
    },
    enabled: !!communityId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    membership,
    isLoading,
    error,
    isMember: membership?.isMember || false,
    isOwner: membership?.isOwner || false,
    canJoin: membership?.canJoin || false,
  };
};
