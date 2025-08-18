export interface Skill {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  sousSkills: SousSkill[];
}

export interface SousSkill {
  id: string;
  title: string;
  skillId: string;
  createdAt: Date;
  updatedAt: Date;

  technologies: Technology[];
}

export interface Technology {
  id: string;
  title: string;
  sousSkillId: string;
  createdAt: Date;
  updatedAt: Date;
}

