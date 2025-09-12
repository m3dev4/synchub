-- CreateEnum
CREATE TYPE "public"."CommunityMode" AS ENUM ('FORUM', 'CHAT', 'HYBRID');

-- CreateEnum
CREATE TYPE "public"."CommunityRole" AS ENUM ('OWNER', 'ADMIN', 'MODERATOR', 'CONTRIBUTOR', 'MEMBER', 'GUEST');

-- CreateEnum
CREATE TYPE "public"."ChannelType" AS ENUM ('TEXT', 'VOICE', 'VIDEO', 'COLLABORATIVE', 'ANNOUNCEMENT');

-- CreateEnum
CREATE TYPE "public"."ChannelMode" AS ENUM ('PUBLIC', 'PRIVATE', 'MEMBERS_ONLY');

-- CreateEnum
CREATE TYPE "public"."BadgeCriteriaType" AS ENUM ('POSTS_COUNT', 'LIKES_RECEIVED', 'COMMENTS_COUNT', 'HELPFUL_ANSWERS', 'EVENT_PARTICIPATION', 'DAYS_ACTIVE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."PostPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'FEATURED');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('MEETING', 'WORKSHOP', 'LIVE_CODING', 'CTF', 'HACKATHON', 'CONFERENCE', 'SOCIAL', 'Q_AND_A');

-- CreateEnum
CREATE TYPE "public"."ConnectionType" AS ENUM ('SUGGESTED', 'PARTNER', 'AFFILIATED');

-- CreateEnum
CREATE TYPE "public"."ParticipationStatus" AS ENUM ('GOING', 'INTERESTED', 'NOT_GOING', 'PENDING');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_INVITATION';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_JOIN_REQUEST';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_MEMBER_JOINED';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_ROLE_CHANGED';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_BADGE_EARNED';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_POST';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_EVENT_CREATED';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_EVENT_REMINDER';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_EVENT_CANCELLED';
ALTER TYPE "public"."NotificationType" ADD VALUE 'COMMUNITY_SUGGESTED';
ALTER TYPE "public"."NotificationType" ADD VALUE 'CHANNEL_MESSAGE';
ALTER TYPE "public"."NotificationType" ADD VALUE 'CHANNEL_MENTION';

-- CreateTable
CREATE TABLE "public"."Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "avatarImage" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "maxMembers" INTEGER DEFAULT 1000,
    "mode" "public"."CommunityMode" NOT NULL DEFAULT 'HYBRID',
    "enableEvents" BOOLEAN NOT NULL DEFAULT true,
    "enableLive" BOOLEAN NOT NULL DEFAULT true,
    "enableCollaboration" BOOLEAN NOT NULL DEFAULT true,
    "categories" TEXT[],
    "tags" TEXT[],
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityMember" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "public"."CommunityRole" NOT NULL DEFAULT 'MEMBER',
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "totalPosts" INTEGER NOT NULL DEFAULT 0,
    "totalLikes" INTEGER NOT NULL DEFAULT 0,
    "totalComments" INTEGER NOT NULL DEFAULT 0,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityBadge" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT NOT NULL DEFAULT '#3B82F6',
    "criteriaType" "public"."BadgeCriteriaType" NOT NULL,
    "criteriaValue" INTEGER NOT NULL,
    "isAutomatic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityMemberBadge" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityMemberBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityChannel" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "type" "public"."ChannelType" NOT NULL DEFAULT 'TEXT',
    "mode" "public"."ChannelMode" NOT NULL DEFAULT 'PUBLIC',
    "allowThreads" BOOLEAN NOT NULL DEFAULT true,
    "allowReplay" BOOLEAN NOT NULL DEFAULT false,
    "moderatedMode" BOOLEAN NOT NULL DEFAULT false,
    "slowMode" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChannelMessage" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentType" "public"."ContentType" NOT NULL DEFAULT 'TEXT',
    "editedAt" TIMESTAMP(3),
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChannelMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MessageReaction" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MessageMention" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageMention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityPost" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentType" "public"."ContentType" NOT NULL DEFAULT 'TEXT',
    "priority" "public"."PostPriority" NOT NULL DEFAULT 'NORMAL',
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "topics" TEXT[],
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityPostMedia" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "type" "public"."MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "filename" TEXT,
    "size" INTEGER,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityPostMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityPostReaction" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityPostReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityPostComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityEvent" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "eventType" "public"."EventType" NOT NULL DEFAULT 'MEETING',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "maxParticipants" INTEGER,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "meetingUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventParticipant" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."ParticipationStatus" NOT NULL DEFAULT 'INTERESTED',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityConnection" (
    "id" TEXT NOT NULL,
    "fromCommunityId" TEXT NOT NULL,
    "toCommunityId" TEXT NOT NULL,
    "type" "public"."ConnectionType" NOT NULL DEFAULT 'SUGGESTED',
    "strength" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "commonTopics" TEXT[],
    "memberOverlap" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_slug_key" ON "public"."Community"("slug");

-- CreateIndex
CREATE INDEX "Community_slug_idx" ON "public"."Community"("slug");

-- CreateIndex
CREATE INDEX "Community_ownerId_idx" ON "public"."Community"("ownerId");

-- CreateIndex
CREATE INDEX "CommunityMember_communityId_role_idx" ON "public"."CommunityMember"("communityId", "role");

-- CreateIndex
CREATE INDEX "CommunityMember_userId_idx" ON "public"."CommunityMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityMember_communityId_userId_key" ON "public"."CommunityMember"("communityId", "userId");

-- CreateIndex
CREATE INDEX "CommunityBadge_communityId_idx" ON "public"."CommunityBadge"("communityId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityMemberBadge_memberId_badgeId_key" ON "public"."CommunityMemberBadge"("memberId", "badgeId");

-- CreateIndex
CREATE INDEX "CommunityChannel_communityId_position_idx" ON "public"."CommunityChannel"("communityId", "position");

-- CreateIndex
CREATE INDEX "ChannelMessage_channelId_createdAt_idx" ON "public"."ChannelMessage"("channelId", "createdAt");

-- CreateIndex
CREATE INDEX "ChannelMessage_authorId_idx" ON "public"."ChannelMessage"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageReaction_messageId_userId_type_key" ON "public"."MessageReaction"("messageId", "userId", "type");

-- CreateIndex
CREATE INDEX "MessageMention_userId_idx" ON "public"."MessageMention"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageMention_messageId_userId_key" ON "public"."MessageMention"("messageId", "userId");

-- CreateIndex
CREATE INDEX "CommunityPost_communityId_createdAt_idx" ON "public"."CommunityPost"("communityId", "createdAt");

-- CreateIndex
CREATE INDEX "CommunityPost_authorId_idx" ON "public"."CommunityPost"("authorId");

-- CreateIndex
CREATE INDEX "CommunityPost_priority_pinned_idx" ON "public"."CommunityPost"("priority", "pinned");

-- CreateIndex
CREATE INDEX "CommunityPostMedia_postId_idx" ON "public"."CommunityPostMedia"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityPostReaction_postId_userId_type_key" ON "public"."CommunityPostReaction"("postId", "userId", "type");

-- CreateIndex
CREATE INDEX "CommunityPostComment_postId_createdAt_idx" ON "public"."CommunityPostComment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "CommunityEvent_communityId_startDate_idx" ON "public"."CommunityEvent"("communityId", "startDate");

-- CreateIndex
CREATE INDEX "CommunityEvent_startDate_idx" ON "public"."CommunityEvent"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "EventParticipant_eventId_userId_key" ON "public"."EventParticipant"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityConnection_fromCommunityId_toCommunityId_key" ON "public"."CommunityConnection"("fromCommunityId", "toCommunityId");

-- AddForeignKey
ALTER TABLE "public"."Community" ADD CONSTRAINT "Community_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMember" ADD CONSTRAINT "CommunityMember_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMember" ADD CONSTRAINT "CommunityMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityBadge" ADD CONSTRAINT "CommunityBadge_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMemberBadge" ADD CONSTRAINT "CommunityMemberBadge_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."CommunityMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMemberBadge" ADD CONSTRAINT "CommunityMemberBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "public"."CommunityBadge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityChannel" ADD CONSTRAINT "CommunityChannel_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChannelMessage" ADD CONSTRAINT "ChannelMessage_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."ChannelMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChannelMessage" ADD CONSTRAINT "ChannelMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."CommunityChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChannelMessage" ADD CONSTRAINT "ChannelMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MessageReaction" ADD CONSTRAINT "MessageReaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."ChannelMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MessageReaction" ADD CONSTRAINT "MessageReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MessageMention" ADD CONSTRAINT "MessageMention_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."ChannelMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MessageMention" ADD CONSTRAINT "MessageMention_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPost" ADD CONSTRAINT "CommunityPost_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPost" ADD CONSTRAINT "CommunityPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPostMedia" ADD CONSTRAINT "CommunityPostMedia_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPostReaction" ADD CONSTRAINT "CommunityPostReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPostReaction" ADD CONSTRAINT "CommunityPostReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPostComment" ADD CONSTRAINT "CommunityPostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPostComment" ADD CONSTRAINT "CommunityPostComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPostComment" ADD CONSTRAINT "CommunityPostComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."CommunityPostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityEvent" ADD CONSTRAINT "CommunityEvent_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityEvent" ADD CONSTRAINT "CommunityEvent_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventParticipant" ADD CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."CommunityEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventParticipant" ADD CONSTRAINT "EventParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityConnection" ADD CONSTRAINT "CommunityConnection_fromCommunityId_fkey" FOREIGN KEY ("fromCommunityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityConnection" ADD CONSTRAINT "CommunityConnection_toCommunityId_fkey" FOREIGN KEY ("toCommunityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
