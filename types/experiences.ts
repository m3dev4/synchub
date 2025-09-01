export interface Experience {
  id: string;
  title: string;
  company: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  current: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExperienceData {
  title: string;
  company: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  userId: string;
}
