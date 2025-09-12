import { User } from "./user";

// Export de l'enum pour utilisation externe
export enum ChannelType {
  GENERAL = "GENERAL",
  VOICE = "VOICE",
  BUG_REPORT = "BUG_REPORT",
  ANNOUNCEMENT = "ANNOUNCEMENT",
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  categoryId: string;
  category: CommunityTags;
  isPrivate: boolean;
  customLink: string;
  ownerId: string;
  owner: User;
  members: CommunityMember[];
  channels: Channel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityTags {
  id: string;
  name: string;
  slug: string;
  description?: string;
  communities: Community[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  type: ChannelType;
  position: number;
  communityId: string;
  community: Community;
  isPrivate: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  authorId: string;
  author: User;
  channelId: string;
  channel: Channel;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityMember {
  id: string;
  userId: string;
  user: User;
  communityId: string;
  community: Community;
  xp: number;
  level: number;
  joinedAt: Date;
  lastActive: Date;
}

// Types pour les requests
export interface CreateCommunityRequest {
  name: string;
  description?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  categoryId: string;
  isPrivate: boolean;
  customLink: string;
}

export interface CommunityResponse {
  success: boolean;
  data?: Community;
  error?: string;
}
