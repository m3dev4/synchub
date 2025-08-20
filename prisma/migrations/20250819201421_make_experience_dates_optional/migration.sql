-- AlterTable
ALTER TABLE "public"."Experience" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "current" SET DEFAULT false;
