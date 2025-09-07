import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "@/types/session";
import { toast } from "sonner";

// Fetch all user sessions
export const useSessions = () => {
  return useQuery<Session[]>({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await fetch("/api/sessions/getAllMySessions");
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      return response.json();
    },
  });
};

// Delete a session
export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await fetch("/api/sessions/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete session");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch sessions
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Session supprimée avec succès");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Erreur lors de la suppression de la session",
      );
    },
  });
};
