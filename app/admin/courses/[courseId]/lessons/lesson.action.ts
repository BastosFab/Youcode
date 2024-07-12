"use server";

import { ServerError, authenticatedAction } from "@/lib/action";
import { getTheMiddleRank } from "@/lib/getTheMiddleRank";
import prisma from "@/lib/prisma";
import { z } from "zod";

const SaveLesonMoveSchema = z.object({
  upItemRannk: z.string().optional(),
  downItemRannk: z.string().optional(),
  lessonId: z.string(),
});

export const saveLessonMove = authenticatedAction(
  SaveLesonMoveSchema,
  async (data, { userId }) => {
    const course = await prisma.course.findFirst({
      where: {
        lessons: {
          some: {
            id: data.lessonId,
          },
        },
        creatorId: userId,
      },
    });

    if (!course) {
      throw new ServerError("Course not found");
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: data.lessonId,
        courseId: course.id,
      },
    });

    if (!lesson) {
      throw new ServerError("Lesson not found");
    }

    const newRank = getTheMiddleRank(data.upItemRannk, data.downItemRannk);

    await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        rank: newRank,
      },
    });

    return {
      message: "Lesson moved successfully",
      newRank,
    };
  }
);
