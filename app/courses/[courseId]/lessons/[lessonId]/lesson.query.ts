import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getLesson = async (lessonId: string, userId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      state: {
        not: "HIDDEN",
      },
    },
    select: {
      id: true,
      state: true,
      name: true,
      content: true,
      users: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
          progress: true,
        },
      },
    },
  });

  if (!lesson) return null;

  return {
    ...lesson,
    progress: lesson.users[0]?.progress ?? "NOT_STARTED",
  };
};

export type LessonType = NonNullable<
  Prisma.PromiseReturnType<typeof getLesson>
>;
