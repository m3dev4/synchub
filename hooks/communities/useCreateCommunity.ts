import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommunitySchema } from "@/validations/community";
import { z } from "zod";

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof createCommunitySchema>) => {
      const response = await fetch("/api/communities/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la création de la communauté",
        );
      }

      return result.data;
    },
    onSuccess: () => {
      // Invalider et recharger la liste des communautés
      queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};
