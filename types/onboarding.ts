import { Education } from "./educations";
import { Experience } from "./experiences";
import { User } from "./user";

export interface UserOnboarding {
  userId: string;
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

  experiences: Experience[];
  educations: Education[];
}
