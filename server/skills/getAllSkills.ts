"use server";

import { PrismaClient } from "@/lib/prisma-client-js";

const prisma = new PrismaClient();

export const allSkills = async () => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        sousSkill: {
          include: {
            Technology: true,
          },
        },
      },
    });

    // Transform data to match expected structure
    const transformedSkills = skills.map((skill) => ({
      id: skill.id,
      title: skill.title,
      sousSkills:
        skill.sousSkill?.map((sousSkill) => ({
          id: sousSkill.id,
          title: sousSkill.title,
          technologies:
            sousSkill.Technology?.map((tech) => ({
              id: tech.id,
              title: tech.title,
            })) || [],
        })) || [],
    }));

    return transformedSkills;
  } catch (error) {
    console.error("Error lors de la récupération des skills", error);
    throw new Error("Failed to fetch skills");
  }
};
