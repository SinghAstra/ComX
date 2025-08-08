import * as yup from "yup";

export const createPostSchema = yup.object({
  content: yup
    .string()
    .min(1, "Post cannot be empty.")
    .required("Post content is required."),
});
