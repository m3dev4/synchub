export type Visibility = "PUBLIC" | "PRIVATE" | "FOLLOWERS_ONLY";

export interface Post {
  id: string;
  authorId: string;
  content: string;
  visibility: Visibility;
  media?: string;
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
  visibility?: Visibility;
  media?: string;
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
}

export interface FeedResponse {
  posts: PostWithAuthor[];
  hasMore: boolean;
  nextCursor?: string;
}
