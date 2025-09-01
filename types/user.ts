import { Education } from "./educations";
import { Experience } from "./experiences";
import { Skill } from "./skills";
import { Nationality } from "./nationality";

export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  avatarPicture?: string | null;
  coverPicture?: string | null;
  description?: string | null;
  dateBirth: Date;
  title?: string | null;
  titleProfession?: string | null;
  linkWebsite?: string | null;
  isVerify?: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpiresAt?: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordTokenExpiresAt?: Date | null;
  onboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  nationalityId?: string;
  nationality?: Nationality;
  location?: string;
  phoneNumber?: string;
  phoneNumberVerificationToken?: string | null;
  phoneNumberVerificationTokenExpiresAt?: Date | null;
  socialLinks?: JSON;
  isOnline?: boolean;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  userSkills: {
    id: string;
    level: string;
    skill: { id: string; title: string };
  }[];
}

export interface UserCreateDto {
  email: string;
  password: string;
}

export interface loginDto {
  email: string;
  password: string;
}

export interface Session extends User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  isOnline: boolean;
  ipAddress: string;
  userAgent: string;
  token: string;
  expiresAt: Date;
}

export interface userUpdateDto {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  description?: string | null;
  title?: string | null;
  titleProfession?: string | null;
  linkWebsite?: string | null;
  password?: string | null;
  nationalityId?: string | null;
  nationality?: Nationality | null;
  location?: string | null;
  phoneNumber?: string | null;
  phoneNumberVerificationToken?: string | null;
  phoneNumberVerificationTokenExpiresAt?: Date | null;
  socialLinks?: string;
}
