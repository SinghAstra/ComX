import * as yup from "yup";

export const profileUpdateSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .required("Name is required."),
  bio: yup.string().max(500, "Bio cannot exceed 500 characters.").nullable(),
});
