import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourses = async ({ userId }: { userId?: string }) => {
  return await prisma.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              userId,
            },
          },
        }
      : undefined,
    select: {
      id: true,
      name: true,
      presentation: true,
      image: true,
      createdAt: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
};

export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];
