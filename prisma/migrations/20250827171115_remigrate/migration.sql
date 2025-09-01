/*
  Warnings:

  - You are about to drop the `UserTechnology` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserTechnology" DROP CONSTRAINT "UserTechnology_technologyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserTechnology" DROP CONSTRAINT "UserTechnology_userId_fkey";

-- DropTable
DROP TABLE "public"."UserTechnology";
