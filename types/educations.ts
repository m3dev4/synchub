export interface Education {
  id: string;
  title: string;
  school: string;
  startDate?: Date;
  endDate?: Date;
  current: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
