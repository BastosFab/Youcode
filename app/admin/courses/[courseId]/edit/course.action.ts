"use server";

import { authenticatedAction } from "@/lib/action";
import { z } from "zod";
import { CourseSchema } from "./course.schema";
import prisma from "@/lib/prisma";

const CourseActionProps = z.object({
  courseId: z.string(),
  data: CourseSchema,
});

export const courseActionEdit = authenticatedAction(
  CourseActionProps,
  async (props, { userId }) => {
    const course = await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });

    return {
      message: "Course updated successfully",
      course,
    };
  }
);

export const courseActionCreate = authenticatedAction(
  CourseSchema,
  async (props, { userId }) => {
    const course = await prisma.course.create({
      data: {
        ...props,
        creatorId: userId,
      },
    });

    return {
      message: "Course created successfully",
      course,
    };
  }
);
