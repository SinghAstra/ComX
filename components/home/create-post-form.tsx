"use client";

import { createPost } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PostWithAuthorAndSkeleton } from "@/interfaces/post";
import { fetchAllPosts } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import Dialog from "../component-x/dialog";
import { useToastContext } from "../providers/toast";

interface CreatePostForm {
  user: User;
}

export function CreatePostForm({ user }: CreatePostForm) {
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: mutateAllPosts } =
    useSWR<PostWithAuthorAndSkeleton[]>(fetchAllPosts);

  const { setToastMessage } = useToastContext();

  const handleOpenDialog = () => {
    setShowCreatePostDialog(true);
    setContent("");
    setErrorMessage(null);
  };

  const handleCancel = () => {
    setShowCreatePostDialog(false);
    setContent("");
    setErrorMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (content.trim() === "") {
      setErrorMessage("Post content cannot be empty.");
      return;
    }

    setIsLoading(true);

    const tempPostId = `optimistic-${Date.now()}`;
    const optimisticPost: PostWithAuthorAndSkeleton = {
      id: tempPostId,
      content: content,
      createdAt: new Date(),
      authorId: "currentUser",
      author: {
        id: user.id,
        name: user.name,
      },
      isSkeleton: true,
    };

    mutateAllPosts(
      (currentPosts) => [optimisticPost, ...(currentPosts || [])],
      false
    );

    setShowCreatePostDialog(false);

    try {
      const result = await createPost(content);

      mutateAllPosts(
        (currentPosts) =>
          currentPosts
            ? currentPosts.filter((post) => post.id !== tempPostId)
            : [],
        false
      );

      if (result.success && result.post) {
        mutateAllPosts(
          (currentPosts) =>
            currentPosts ? [result.post!, ...currentPosts] : [],
          false
        );

        setContent("");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      mutateAllPosts(
        (currentPosts) =>
          currentPosts
            ? currentPosts.filter((post) => post.id !== tempPostId)
            : [],
        false
      );

      console.log("Error submitting post");
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
      setToastMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        onClick={handleOpenDialog}
        className="w-full transition-all duration-200 hover:bg-muted/40 rounded"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Create New Post</span>
      </Button>

      <Dialog
        isDialogVisible={showCreatePostDialog}
        setIsDialogVisible={setShowCreatePostDialog}
        keyToMakeDialogVisible="n"
      >
        <div className="flex items-center border-b px-4 py-3">
          <h2 className="text-lg font-semibold">What&apos;s on your mind ?</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Textarea
              id="content"
              name="content"
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setErrorMessage(null);
              }}
              className={cn(
                "min-h-[120px] resize-none",
                errorMessage ? "border-destructive" : ""
              )}
              rows={6}
              disabled={isLoading} // Use isLoading here
            />
            {errorMessage && (
              <p className="text-sm text-destructive text-right">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || content.trim() === ""}
              className="flex-1 relative"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Posting...
                </div>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
