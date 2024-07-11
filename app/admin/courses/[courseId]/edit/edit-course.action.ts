"use server";

import { authenticatedAction } from "@/lib/action";
import { z } from "zod";
import { EditCourseSchema } from "./edit-course.schema";
import prisma from "@/lib/prisma";

const EditCourseActionProps = z.object({
  courseId: z.string(),
  data: EditCourseSchema,
});

export const edtiCourseAction = authenticatedAction(
  EditCourseActionProps,
  async (props, { userId }) => {
    return await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });

    return "Course updated successfully";
  }
);
