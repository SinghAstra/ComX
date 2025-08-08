import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PostWithAuthorAndSkeleton } from "@/interfaces/post";
import Link from "next/link";

interface PostCardProps {
  post: PostWithAuthorAndSkeleton;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full border bg-muted/40 px-4 py-2">
      <Link href={`/profile/${post.author.id}`}>
        <div className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="bg-muted/60">
            <AvatarFallback>
              {post.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="flex flex-col">
            {post.author.name}
            <span className="text-sm text-muted-foreground">
              {formattedDate}
            </span>
          </p>
        </div>
      </Link>
      <p>{post.content}</p>
    </div>
  );
}
