"use server";

import { PostWithAuthorAndSkeleton } from "@/interfaces/post";
import { db } from "@/lib/db";
import { createPostSchema } from "@/validations/post";
import { revalidatePath } from "next/cache";
import { ValidationError } from "yup";
import { getCurrentUser } from "./auth";

interface CreatePostResponse {
  success: boolean;
  message: string;
  post?: PostWithAuthorAndSkeleton;
}

export async function createPost(content: string): Promise<CreatePostResponse> {
  try {
    // 1. Authenticate and get current user
    const currentUser = await getCurrentUser();
    console.log("currentUser is ", currentUser);
    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to create a post.",
      };
    }

    // 2. Validate input using Yup
    await createPostSchema.validate({ content }, { abortEarly: false });

    // 3. Create the post in the database
    const newPost = await db.post.create({
      data: {
        content: content,
        authorId: currentUser.id,
      },
    });
    console.log("newPost is ", newPost);

    // 4. Revalidate the home path to show the new post
    revalidatePath("/home");
    revalidatePath(`/profile/${currentUser.id}`);

    return {
      success: true,
      message: "Post created successfully!",
      post: {
        ...newPost,
        author: {
          id: currentUser.id,
          name: currentUser.name,
        },
      },
    };
  } catch (error) {
    console.log("Error creating post.");
    if (error instanceof ValidationError) {
      return {
        success: false,
        message: "Validation failed.",
      };
    }
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return { success: false, message: "Failed to create post." };
  }
}

export async function getPosts() {
  try {
    // 1. Authenticate and get current user
    const currentUser = await getCurrentUser();
    console.log("currentUser is ", currentUser);
    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to fetch posts.",
        posts: [],
      };
    }

    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log("posts is ", posts);

    return { success: true, posts };
  } catch (error) {
    console.log("Error fetching posts.");
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return { success: false, message: "Failed to fetch posts.", posts: [] };
  }
}

export async function getUserPosts(userId: string) {
  try {
    const posts = await db.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { success: true, data: posts };
  } catch (error) {
    console.log(`Error fetching posts for user ${userId}.`);
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return {
      success: false,
      message: "Failed to fetch user's posts.",
      data: [],
    };
  }
}
