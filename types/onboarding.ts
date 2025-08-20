export interface SelectedSkill {
  skillId: string;
  skillTitle: string;
  sousSkillId: string;
  sousSkillTitle: string;
  technologyId: string;
  technologyTitle: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
}

export interface OnboardingExperience {
  id: string;
  title?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

export interface OnboardingEducation {
  id: string;
  title?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

export interface UserOnboarding {
  userId?: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarPicture?: string;
  nationalityId: string;
  description?: string;
  dateBirth: Date;
  title?: string;
  titleProfession?: string;
  linkWebsite?: string;

  experiences: OnboardingExperience[];
  educations: OnboardingEducation[];
  skills?: SelectedSkill[];
}
