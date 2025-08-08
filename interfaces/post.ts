import { Post } from "@prisma/client";

export interface PostWithAuthorAndSkeleton extends Post {
  author: {
    id: string;
    name: string;
  };
  isSkeleton?: boolean;
}
