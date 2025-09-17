import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();

  const joinCommunity = useMutation({
    mutationFn: async (communityId: string) => {
      const response = await fetch(`/api/communities/${communityId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Erreur lors de l'adhésion à la communauté");
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Vous avez rejoint la communauté !");

      // Invalider les caches pour mettre à jour les listes
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["user-communities"] });
      queryClient.invalidateQueries({ queryKey: ["community", data.data?.community?.id] });
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de l'adhésion");
    },
  });

  const leaveCommunity = useMutation({
    mutationFn: async (communityId: string) => {
      const response = await fetch(`/api/communities/${communityId}/join`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Erreur lors de la sortie de la communauté");
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Vous avez quitté la communauté");

      // Invalider les caches pour mettre à jour les listes
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["user-communities"] });
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de la sortie");
    },
  });

  return {
    joinCommunity: joinCommunity.mutate,
    leaveCommunity: leaveCommunity.mutate,
    isJoining: joinCommunity.isPending,
    isLeaving: leaveCommunity.isPending,
    joinError: joinCommunity.error,
    leaveError: leaveCommunity.error,
  };
};
