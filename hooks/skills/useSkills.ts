import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Skill,
  UserSkill,
  SkillLevel,
  SkillsResponse,
  UserSkillsResponse,
} from "@/types/skills";

// Fetch all available skills
export const useSkills = () => {
  return useQuery<SkillsResponse>({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await fetch("/api/skills");
      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }
      return response.json();
    },
  });
};

// Fetch user's skills
export const useUserSkills = () => {
  return useQuery<UserSkillsResponse>({
    queryKey: ["userSkills"],
    queryFn: async () => {
      const response = await fetch("/api/user/skills");
      if (!response.ok) {
        throw new Error("Failed to fetch user skills");
      }
      return response.json();
    },
  });
};

// Add or update user skill
export const useAddUserSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      skillId,
      level,
    }: {
      skillId: string;
      level: SkillLevel;
    }) => {
      const response = await fetch("/api/user/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillId, level }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add skill");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch user skills
      queryClient.invalidateQueries({ queryKey: ["userSkills"] });
    },
  });
};

// Remove user skill
export const useRemoveUserSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skillId: string) => {
      const response = await fetch("/api/user/skills", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove skill");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch user skills
      queryClient.invalidateQueries({ queryKey: ["userSkills"] });
    },
  });
};
