"use client";

import { PostWithAuthorAndSkeleton } from "@/interfaces/post";
import { FETCH_POSTS_KEY } from "@/lib/constants";
import useSWR from "swr";
import { PostCard } from "./post-card";

interface PostFeedProps {
  initialPosts: PostWithAuthorAndSkeleton[];
}

export function PostFeed({ initialPosts }: PostFeedProps) {
  const { data: posts } = useSWR<PostWithAuthorAndSkeleton[]>(FETCH_POSTS_KEY, {
    fallbackData: initialPosts,
  });

  if (!posts || posts.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        No posts yet. Be the first to share something!
      </p>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl w-full mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
