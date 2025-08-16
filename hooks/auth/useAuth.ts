import { useAuthStore } from "@/stores/auth/authState";
import { loginDto, User, UserCreateDto } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const signUp = () => {
  const router = useRouter();
  const { setPendingVerification, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (data: UserCreateDto) => {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur inconnue");
      return result;
    },
    onSuccess: (user) => {
      setPendingVerification(user.email);
      router.push("/auth/verify-email");
    },
    onError: (error) => {
      console.error("Erreur inscription", error);
    },
  });
};

export const signIn = () => {
  const router = useRouter();
  const { setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (data: loginDto) => {
      const response = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur inconnue");
      return result;
    },
    onSuccess: (user) => {
      setLoading(false);
      router.push("/feeds");
    },
    onError: (error) => {
      console.error("Erreur connexion", error);
    },
  });
};

export const verifyEmail = () => {
  const router = useRouter();
  const { setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (token: string) => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
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
      router.push("/pages/home");
    },
    onError: (error) => {
      console.error("Erreur verification email", error);
    },
  });
};

export const logout = () => {
  const router = useRouter();
  const { setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur inconnue");
      return result;
    },
    onSuccess: () => {
      setLoading(false);
      router.push("/pages/home");
    },
    onError: (error) => {
      console.error("Erreur deconnexion", error);
    },
  });
};
