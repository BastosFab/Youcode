import { LessonState } from "@prisma/client";
import { z } from "zod";

export const LESSON_STATES = [
  "HIDDEN",
  "PUBLISHED",
  "PUBLIC",
] as const satisfies LessonState[];

export const LessonDetailsSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
  state: z.enum(LESSON_STATES),
});

export type LessonDetailsSchemaType = z.infer<typeof LessonDetailsSchema>;
