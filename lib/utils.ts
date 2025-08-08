import { getPosts } from "@/actions/posts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FETCH_POSTS_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (key: string) => {
  if (key === FETCH_POSTS_KEY) {
    const result = await getPosts();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch posts.");
    }
    return result.posts;
  }
  throw new Error(`Unknown SWR key: ${key}`);
};
