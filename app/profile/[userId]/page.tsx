import { getCurrentUser, getUserById } from "@/actions/auth";
import { getUserPosts } from "@/actions/posts";
import { Navbar } from "@/components/home/navbar";
import { UserPosts } from "@/components/home/user-posts";
import { notFound, redirect } from "next/navigation";
import { UserProfileCard } from "./user-profile-card";

interface UserProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { userId } = await params;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  const profileUser = await getUserById(userId);

  if (!profileUser) {
    notFound();
  }

  const { data: userPosts } = await getUserPosts(userId);

  const isCurrentUser = currentUser.id === profileUser.id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentUser={currentUser} />
      <main className="px-4 py-8 space-y-8 w-full max-w-2xl mx-auto">
        <UserProfileCard user={profileUser} isCurrentUser={isCurrentUser} />

        <div>
          <h2 className="text-2xl font-bold mb-4">
            {isCurrentUser ? "Your Posts" : `${profileUser.name}'s Posts`}
          </h2>
          <UserPosts initialPosts={userPosts || []} />
        </div>
      </main>
    </div>
  );
}
