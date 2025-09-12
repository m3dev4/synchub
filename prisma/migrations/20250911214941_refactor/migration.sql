/*
  Warnings:

  - The values [COMMUNITY_INVITATION,COMMUNITY_JOIN_REQUEST,COMMUNITY_MEMBER_JOINED,COMMUNITY_ROLE_CHANGED,COMMUNITY_BADGE_EARNED,COMMUNITY_POST,COMMUNITY_EVENT_CREATED,COMMUNITY_EVENT_REMINDER,COMMUNITY_EVENT_CANCELLED,COMMUNITY_SUGGESTED,CHANNEL_MESSAGE,CHANNEL_MENTION] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ChannelMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Community` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityBadge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityConnection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityMemberBadge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityPostComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityPostMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityPostReaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageMention` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageReaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."NotificationType_new" AS ENUM ('FOLLOW', 'UNFOLLOW', 'FOLLOW_REQUEST', 'LIKE', 'COMMENT', 'MESSAGE', 'POST', 'REACTION', 'MENTION');
ALTER TABLE "public"."Notification" ALTER COLUMN "type" TYPE "public"."NotificationType_new" USING ("type"::text::"public"."NotificationType_new");
ALTER TYPE "public"."NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "public"."NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."ChannelMessage" DROP CONSTRAINT "ChannelMessage_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChannelMessage" DROP CONSTRAINT "ChannelMessage_channelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChannelMessage" DROP CONSTRAINT "ChannelMessage_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Community" DROP CONSTRAINT "Community_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityBadge" DROP CONSTRAINT "CommunityBadge_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityChannel" DROP CONSTRAINT "CommunityChannel_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityConnection" DROP CONSTRAINT "CommunityConnection_fromCommunityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityConnection" DROP CONSTRAINT "CommunityConnection_toCommunityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityEvent" DROP CONSTRAINT "CommunityEvent_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityEvent" DROP CONSTRAINT "CommunityEvent_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityMember" DROP CONSTRAINT "CommunityMember_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityMember" DROP CONSTRAINT "CommunityMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityMemberBadge" DROP CONSTRAINT "CommunityMemberBadge_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityMemberBadge" DROP CONSTRAINT "CommunityMemberBadge_memberId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPost" DROP CONSTRAINT "CommunityPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPost" DROP CONSTRAINT "CommunityPost_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPostComment" DROP CONSTRAINT "CommunityPostComment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPostComment" DROP CONSTRAINT "CommunityPostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPostComment" DROP CONSTRAINT "CommunityPostComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPostMedia" DROP CONSTRAINT "CommunityPostMedia_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPostReaction" DROP CONSTRAINT "CommunityPostReaction_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityPostReaction" DROP CONSTRAINT "CommunityPostReaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventParticipant" DROP CONSTRAINT "EventParticipant_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventParticipant" DROP CONSTRAINT "EventParticipant_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageMention" DROP CONSTRAINT "MessageMention_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageMention" DROP CONSTRAINT "MessageMention_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageReaction" DROP CONSTRAINT "MessageReaction_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageReaction" DROP CONSTRAINT "MessageReaction_userId_fkey";

-- DropTable
DROP TABLE "public"."ChannelMessage";

-- DropTable
DROP TABLE "public"."Community";

-- DropTable
DROP TABLE "public"."CommunityBadge";

-- DropTable
DROP TABLE "public"."CommunityChannel";

-- DropTable
DROP TABLE "public"."CommunityConnection";

-- DropTable
DROP TABLE "public"."CommunityEvent";

-- DropTable
DROP TABLE "public"."CommunityMember";

-- DropTable
DROP TABLE "public"."CommunityMemberBadge";

-- DropTable
DROP TABLE "public"."CommunityPost";

-- DropTable
DROP TABLE "public"."CommunityPostComment";

-- DropTable
DROP TABLE "public"."CommunityPostMedia";

-- DropTable
DROP TABLE "public"."CommunityPostReaction";

-- DropTable
DROP TABLE "public"."EventParticipant";

-- DropTable
DROP TABLE "public"."MessageMention";

-- DropTable
DROP TABLE "public"."MessageReaction";

-- DropEnum
DROP TYPE "public"."BadgeCriteriaType";

-- DropEnum
DROP TYPE "public"."ChannelMode";

-- DropEnum
DROP TYPE "public"."ChannelType";

-- DropEnum
DROP TYPE "public"."CommunityMode";

-- DropEnum
DROP TYPE "public"."CommunityRole";

-- DropEnum
DROP TYPE "public"."ConnectionType";

-- DropEnum
DROP TYPE "public"."EventType";

-- DropEnum
DROP TYPE "public"."ParticipationStatus";

-- DropEnum
DROP TYPE "public"."PostPriority";
