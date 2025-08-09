"use client";

import { PostWithAuthorAndSkeleton } from "@/interfaces/post";
import { fetchAllUserPosts } from "@/lib/constants";
import useSWR from "swr";
import { PostCard } from "./post-card";

interface UserPostsProps {
  initialPosts: PostWithAuthorAndSkeleton[];
}

export function UserPosts({ initialPosts }: UserPostsProps) {
  const { data: posts } = useSWR<PostWithAuthorAndSkeleton[]>(
    fetchAllUserPosts,
    {
      fallbackData: initialPosts,
    }
  );

  if (!posts || posts.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        No posts yet.Share something!
      </p>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
