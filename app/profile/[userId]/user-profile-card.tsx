import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

interface UserProfileCardProps {
  user: User;
  isCurrentUser: boolean;
}

export function UserProfileCard({ user, isCurrentUser }: UserProfileCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto rounded p-2 border">
      <div className="flex flex-col items-center text-center p-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarFallback className="text-4xl">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-3xl font-bold">{user.name}</p>
        <p className="text-muted-foreground">@{user.email.split("@")[0]}</p>
        {isCurrentUser && (
          <Button asChild className="mt-4">
            <Link href="/settings/profile">
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        )}
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">About Me</h3>
            <p className="text-muted-foreground">
              {user.bio || "No bio provided yet."}
            </p>
          </div>
          {/* Add more profile details here if needed, e.g., join date */}
          <div className="text-sm text-muted-foreground">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
