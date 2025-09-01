import { User, UserRole } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  pendingEmail: string | null;
  hydrated: boolean;

  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPendingVerification: (email: string) => void;
  setEmailVerified: (user: User) => void;
  logout: () => void;
  setHydrated: () => void;

  // Getters
  needsEmailVerification: () => boolean;
  isAdmin: () => boolean;
  getUserRole: () => UserRole;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
      pendingEmail: null,
      hydrated: false,

      setUser: (user) => set({ user }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setPendingVerification: (email) => set({ pendingEmail: email }),
      setEmailVerified: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setHydrated: () => set({ hydrated: true }),

      needsEmailVerification: () =>
        !!get().pendingEmail && !get().user?.isVerify,
      isAdmin: () => get().user?.role === "ADMIN",
      getUserRole: () => get().user?.role || "USER",
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pendingEmail: state.pendingEmail,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Rehydration error:", error);
        } else {
          console.log("Rehydrating auth store:", state);

          // Synchroniser avec les cookies après la réhydratation
          if (state && typeof window !== "undefined") {
            const serializedData = JSON.stringify({ state, version: 0 });
            document.cookie = `auth-storage=${encodeURIComponent(serializedData)}; path=/; max-age=604800; SameSite=Lax`;
            console.log("Synced auth data to cookies");
          }
        }

        // CORRECTION : Utiliser set() au lieu de return
        if (state) {
          state.setHydrated();
        }
      },
    },
  ),
);
