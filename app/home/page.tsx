import { getCurrentUser } from "@/actions/auth";
import { CreatePostForm } from "@/components/home/create-post-form";
import { Navbar } from "@/components/home/navbar";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentUser={currentUser} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8"></div>
        {/* {postsSuccess && posts.length > 0 ? (
          <PostFeed posts={posts} />
        ) : (
          <p className="text-muted-foreground text-center">
            No posts yet. Be the first to share something!
          </p>
        )} */}
      </main>
    </div>
  );
}
