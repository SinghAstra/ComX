import { getCurrentUser } from "@/actions/auth";
import { getPosts } from "@/actions/posts";
import { Navbar } from "@/components/home/navbar";
import { redirect } from "next/navigation";
import { PostFeed } from "../../components/home/post-feed";

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  const { posts } = await getPosts();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentUser={currentUser} />
      <main className="px-4 py-8">
        <PostFeed initialPosts={posts} />
      </main>
    </div>
  );
}
