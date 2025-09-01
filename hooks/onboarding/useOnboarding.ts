import { useAuthStore } from "@/stores/auth/authState";
import { UserOnboarding } from "@/types/onboarding";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useOnboarding = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: UserOnboarding) => {
      const response = await fetch("/api/user/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Erreur onboarding");
      }
      return result;
    },
    onSuccess: (result) => {
      if (result.user) {
        setUser(result.user);
        router.push("/feeds");
      }
    },
    onError: (error) => {
      alert(error.message);
      console.error("Erreur onboarding:", error);
    },
  });
};
