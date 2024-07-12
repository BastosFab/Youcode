import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourse = async ({
  courseId,
  userId = "-",
}: {
  courseId: string;
  userId?: string;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      presentation: true,
      image: true,
      users: {
        where: {
          userId,
        },
        select: {
          id: true,
          canceledAt: true,
        },
      },
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      lessons: {
        where: {
          state: {
            in: ["PUBLIC", "PUBLISHED"],
          },
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          name: true,
          state: true,
          courseId: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  const lessons = course.lessons.map((lesson) => {
    const progress = lesson.users[0]?.progress ?? "NOT_STARTED";
    return {
      ...lesson,
      progress,
    };
  });

  return {
    ...course,
    isEnrolled: course.users.length > 0 && !course.users[0].canceledAt,
    isCancelled: course.users.length > 0 && !!course.users[0].canceledAt,
    lessons,
  };
};

export type CourseType = NonNullable<
  Prisma.PromiseReturnType<typeof getCourse>
>;

export type CourseLessonItem = CourseType["lessons"][0];
