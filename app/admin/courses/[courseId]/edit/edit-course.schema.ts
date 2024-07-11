import { Presentation } from "lucide-react";
import { z } from "zod";

export const EditCourseSchema = z.object({
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

export type EditCourseSchema = z.infer<typeof EditCourseSchema>;
