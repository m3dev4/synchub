import { Experience } from "@/types/experiences";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExperienceState {
  experiences: Experience[];
  isLoading: boolean;
  error: string | null;

  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setExperiences: (experiences: Experience[]) => void;
  addExperience: (experience: Experience) => void;
  removeExperience: (experienceId: string) => void;
  updateExperience: (experience: Experience) => void;

  clearError: () => void;
  reset: () => void;
}

const initialState = {
  experiences: [],
  isLoading: false,
  error: null,
};

export const useExperienceStore = create<ExperienceState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setExperiences: (experiences) => set({ experiences }),
      addExperience: (experience) =>
        set((state) => ({ experiences: [...state.experiences, experience] })),
      removeExperience: (experienceId) =>
        set((state) => ({
          experiences: state.experiences.filter(
            (exp) => exp.id !== experienceId,
          ),
        })),
      updateExperience: (experience) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === experience.id ? experience : exp,
          ),
        })),

      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: "experience",
      partialize: (state) => ({
        experiences: state.experiences,
      }),
      version: 1,
    },
  ),
);
