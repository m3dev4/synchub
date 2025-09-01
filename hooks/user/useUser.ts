import { useAuthStore } from "@/stores/auth/authState";
import { userUpdateDto } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const updateUser = (id: string) => {
  const { updateUser, setLoading, setUser } = useAuthStore();
  return useMutation({
    mutationFn: async (data: userUpdateDto) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user/update/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erreur inconnue");
        return result;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess: (user) => {
      setLoading(false);
      updateUser(user);
      setUser(user);
    },
    onError: (error) => {
      setLoading(false);
      console.error("Erreur mise à jour utilisateur", error);
    },
  });
};
