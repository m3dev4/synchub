import { useQuery } from "@tanstack/react-query";

export const useMember = (id: string) => {
  // Get all number of members in a community
  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      const response = await fetch(`/api/communities/${id}/members`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération des membres",
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
    members,
    isLoading,
    error,
  };
};
