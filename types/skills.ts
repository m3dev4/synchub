export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
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
  sousSkill: SousSkill;
}

export interface SousSkill {
  id: string;
  title: string;
  skillId: string;
  createdAt: Date;
  updatedAt: Date;
  skill: Skill;
  Technology?: Technology[];
}

export interface Skill {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  sousSkill?: SousSkill[];
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

export interface UserTechnology {
  id: string;
  userId: string;
  technologyId: string;
  level: SkillLevel;
  createdAt: Date;
  updatedAt: Date;
  technology: Technology;
}

export interface SkillsResponse {
  data: Skill[];
  message: string;
}

export interface UserSkillsResponse {
  data: UserSkill[];
  message: string;
}

export interface UserTechnologiesResponse {
  data: UserTechnology[];
  message: string;
}
