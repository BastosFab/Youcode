import { z } from "zod";

export const CourseSchema = z.object({
  image: z.string().url(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
  presentation: z.string(),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
