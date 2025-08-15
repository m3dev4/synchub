-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_nationalityId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "nationalityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "public"."Nationality"("id") ON DELETE SET NULL ON UPDATE CASCADE;
