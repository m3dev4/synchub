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
      router.push("/verify-email");
    },
    onError: (error) => {
      console.error("Erreur inscription", error);
    },
  });
};

export const signIn = () => {
  const router = useRouter();
  const { setLoading, setPendingVerification } = useAuthStore();

  return useMutation({
    mutationFn: async (data: loginDto) => {
      const response = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.error || "Erreur inconnue");
        (error as any).needsVerification = result.needsVerification;
        (error as any).email = data.email;
        throw error;
      }
      return result;
    },
    onSuccess: (user) => {
      setLoading(false);
      // Mettre à jour le store avec l'utilisateur connecté
      const { setUser } = useAuthStore.getState();
      setUser(user.user);
      useAuthStore.setState({ isAuthenticated: true });
      router.push("/feeds");
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Erreur connexion", error);

      // Si l'email n'est pas vérifié, rediriger vers la page de vérification
      if (error.message === "Email not verified" && error.needsVerification) {
        setPendingVerification(error.email || "");
        router.push("/verify-email");
      }
    },
  });
};

export const verifyEmail = () => {
  const router = useRouter();
  const { setLoading, setEmailVerified, setPendingVerification } =
    useAuthStore();

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
      setEmailVerified(user);
      setPendingVerification("");
      router.push("/onboarding");
    },
    onError: (error) => {
      setLoading(false);
      console.error("Erreur verification email", error);
    },
  });
};

export const resendVerificationCode = () => {
  const { setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (email: string) => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/resend-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erreur inconnue");
        return result;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess: () => {
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error("Erreur renvoi code", error);
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
      router.push("/sign-in");
    },
    onError: (error) => {
      console.error("Erreur deconnexion", error);
    },
  });
};

export const forgotPassword = () => {
  const { setLoading } = useAuthStore();
  return useMutation({
    mutationFn: async (email: string) => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/forgotPassword", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const result = await response.json();

        if (!response.ok)
          throw new Error(result.error || "Une Erreur est survenue");
        return result;
      } catch (error) {
        setLoading(false);
        throw Error;
      }
    },
    onSuccess: () => {
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.log("une erreur est suvernue lors de l'envoi l'email", error);
    },
  });
};

export const resetPassword = () => {
  const { setLoading } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      newPassword,
      token,
    }: {
      newPassword: string;
      token: string;
    }) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/auth/reset-password?token=${token}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }),
          },
        );
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Erreur inconnue");
        return result;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess: () => {
      setLoading(false);
      router.push("/sign-in");
    },
    onError: (error) => {
      setLoading(false);
      console.log("Erreur:", error);
    },
  });
};
