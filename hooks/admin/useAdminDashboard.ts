import { useQuery } from "@tanstack/react-query";

export const useAdminDashboard = (communityId: string) => {
  const { data: dashboardData, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-dashboard", communityId],
    queryFn: async () => {
      const response = await fetch(`/api/communities/${communityId}/admin/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération des données du dashboard"
        );
      }

      return result.data;
    },
    enabled: !!communityId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    dashboardData,
    isLoading,
    error,
    refetch,
  };
};
