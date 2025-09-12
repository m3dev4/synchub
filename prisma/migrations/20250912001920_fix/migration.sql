/*
  Warnings:

  - You are about to drop the `_CommunityMemberToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommunityToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_CommunityMemberToUser" DROP CONSTRAINT "_CommunityMemberToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CommunityMemberToUser" DROP CONSTRAINT "_CommunityMemberToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CommunityToUser" DROP CONSTRAINT "_CommunityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CommunityToUser" DROP CONSTRAINT "_CommunityToUser_B_fkey";

-- DropTable
DROP TABLE "public"."_CommunityMemberToUser";

-- DropTable
DROP TABLE "public"."_CommunityToUser";
