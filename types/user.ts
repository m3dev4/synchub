export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  firtsName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  avatarPicture?: string | null;
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
