import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarFallback>
            {post.author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link
            href={`/profile/${post.author.id}`}
            className="font-semibold hover:underline"
          >
            {post.author.name}
          </Link>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="text-base">
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
}
