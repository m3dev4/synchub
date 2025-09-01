-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "phoneNumberVerificationToken" TEXT,
ADD COLUMN     "phoneNumberVerificationTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "socialLinks" JSONB;
