export type Visibility = "PUBLIC" | "PRIVATE" | "FOLLOWERS_ONLY";
export type ContentType = "TEXT" | "MARKDOWN" | "RICH_TEXT";
export type MediaType = "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";
export type CollaboratorRole = "OWNER" | "EDITOR" | "CONTRIBUTOR" | "VIEWER";
export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "WOW" | "SAD" | "ANGRY";

export interface PostMedia {
  id: string;
  type: MediaType;
  url: string;
  publicId?: string;
  filename?: string;
  size?: number;
  duration?: number;
}

export interface PostCollaborator {
  id: string;
  userId: string;
  role: CollaboratorRole;
  addedAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarPicture?: string;
  };
}

export interface PostReaction {
  id: string;
  postId: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarPicture?: string;
  };
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarPicture?: string;
  };
  replies?: Comment[];
}

export interface Mention {
  id: string;
  postId?: string;
  commentId?: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarPicture?: string;
  };
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  contentType: ContentType;
  visibility: Visibility;
  media: PostMedia[];
  isCollaborative: boolean;
  collaborators: PostCollaborator[];
  reactions?: PostReaction[];
  comments?: Comment[];
  mentions?: Mention[];
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarPicture?: string;
  };
}

export interface CreatePostDto {
  content: string;
  contentType?: ContentType;
  visibility?: Visibility;
  media?: {
    type: MediaType;
    url: string;
    publicId?: string;
    filename?: string;
    size?: number;
    duration?: number;
  }[];
  isCollaborative?: boolean;
  collaboratorIds?: string[];
}

export interface PostWithAuthor extends Post {
  author: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarPicture?: string;
    isFollowing?: boolean;
  };
  _count?: {
    comments: number;
    reactions: number;
  };
}

export interface ReactionSummary {
  type: ReactionType;
  count: number;
}

export interface PostInteractions {
  reactions: ReactionSummary[];
  userReaction?: ReactionType;
  commentCount: number;
}

export interface FeedResponse {
  posts: PostWithAuthor[];
  hasMore: boolean;
  nextCursor?: string;
}
