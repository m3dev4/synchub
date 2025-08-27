import { Education } from "@/types/educations";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEducation = () => {
  const queryClient = useQueryClient();

  // Hook pour récupérer les education
  const {
    data: educations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["educations"],
    queryFn: async () => {
      const response = await fetch("/api/educations/all", {
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
      return result.educations || [];
    },
  });

  // Hook pour créer une nouvelle education
  const createEducation = useMutation({
    mutationFn: async (educationData: Partial<Education>) => {
      const response = await fetch("/api/educations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important pour envoyer les cookies
        body: JSON.stringify(educationData),
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
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
    onError: (error) => {
      console.error("Erreur création expérience:", error);
    },
  });

  return {
    educations,
    isLoading,
    error,
    createEducation,
  };
};
