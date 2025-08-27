import { useExperienceStore } from "@/stores/experiences/useExperience";
import { Experience } from "@/types/experiences";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExperience = () => {
  const queryClient = useQueryClient();

  // Hook pour récupérer les expériences
  const {
    data: experiences,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const response = await fetch("/api/experiences/all", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important pour envoyer les cookies
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération des expériences",
        );
      }
      return result.experiences || [];
    },
  });

  // Hook pour créer une nouvelle expérience
  const createExperience = useMutation({
    mutationFn: async (experienceData: Partial<Experience>) => {
      const response = await fetch("/api/experiences/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important pour envoyer les cookies
        body: JSON.stringify(experienceData),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la création de l'expérience",
        );
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (error) => {
      console.error("Erreur création expérience:", error);
    },
  });

  return {
    experiences,
    isLoading,
    error,
    createExperience,
  };
};
