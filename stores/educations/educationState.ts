import { Education } from "@/types/educations";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EducationState {
  educations: Education[];
  isLoading: boolean;
  error: string | null;

  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setEducations: (educations: Education[]) => void;
  addEducation: (education: Education) => void;
  removeEducation: (educationId: string) => void;
  updateEducation: (education: Education) => void;

  clearError: () => void;
  reset: () => void;
}

const initialState = {
  educations: [],
  isLoading: false,
  error: null,
};

export const useEducationStore = create<EducationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setEducations: (educations) => set({ educations }),
      addEducation: (education) =>
        set((state) => ({ educations: [...state.educations, education] })),
      removeEducation: (educationId) =>
        set((state) => ({
          educations: state.educations.filter((edu) => edu.id !== educationId),
        })),
      updateEducation: (education) =>
        set((state) => ({
          educations: state.educations.map((edu) =>
            edu.id === education.id ? education : edu,
          ),
        })),

      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: "education",
      partialize: (state) => ({
        educations: state.educations,
      }),
      version: 1,
    },
  ),
);
