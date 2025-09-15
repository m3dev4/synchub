import { useQuery } from "@tanstack/react-query";

export const useCategory = (id: string) => {
  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await fetch(`/api/communities/${id}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération de la catégorie",
        );
      }
      return result.data || {};
    },
  });

  return { category, isLoading, error };
};
