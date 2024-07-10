import prisma from "@/lib/prisma";

export const getCourseLessons = async ({
  courseId,
  creatorId,
}: {
  courseId: string;
  creatorId: string;
}) => {
  return await prisma.course.findFirst({
    where: {
      creatorId: creatorId,
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      lessons: true,
    },
  });
};
