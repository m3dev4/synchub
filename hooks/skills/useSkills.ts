import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Skill,
  UserSkill,
  SkillLevel,
  SkillsResponse,
  UserSkillsResponse,
  UserTechnology,
  UserTechnologiesResponse,
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

// Fetch user's technologies
export const useUserTechnologies = () => {
  return useQuery<UserTechnologiesResponse>({
    queryKey: ["userTechnologies"],
    queryFn: async () => {
      const response = await fetch("/api/user/technologies");
      if (!response.ok) {
        throw new Error("Failed to fetch user technologies");
      }
      return response.json();
    },
  });
};

// Add or update user technology
export const useAddUserTechnology = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      technologyId,
      level,
    }: {
      technologyId: string;
      level: SkillLevel;
    }) => {
      const response = await fetch("/api/user/technologies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ technologyId, level }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add technology");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch user technologies
      queryClient.invalidateQueries({ queryKey: ["userTechnologies"] });
    },
  });
};

// Remove user technology
export const useRemoveUserTechnology = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (technologyId: string) => {
      const response = await fetch("/api/user/technologies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ technologyId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove technology");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch user technologies
      queryClient.invalidateQueries({ queryKey: ["userTechnologies"] });
    },
  });
};
