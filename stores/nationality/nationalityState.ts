import { Nationality } from "@/types/nationality";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NationalityState {
  nationalities: Nationality[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setNationalities: (nationalities: Nationality[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  nationalities: [],
  isLoading: false,
  error: null,
};

export const useCategoryStore = create<NationalityState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setNationalities: (nationalities) => set({ nationalities, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: "nationality-storage",
      partialize: (state) => ({
        nationalities: state.nationalities,
      }),
      version: 1,
    },
  ),
);
