export interface Skill {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  sousSkill: SousSkill[];
}

export interface SousSkill {
  id: string;
  title: string;
  skillId: string;
  createdAt: Date;
  updatedAt: Date;
  Technology: Technology[];
}

export interface Technology {
  id: string;
  title: string;
  icon: string;
  color: string;
  category: string;
  sousSkillTechId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  level: SkillLevel;
  createdAt: Date;
  updatedAt: Date;
  skill: Skill;
}

export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export interface SkillsResponse {
  success: boolean;
  data: Skill[];
}

export interface UserSkillsResponse {
  success: boolean;
  data: UserSkill[];
}
