import React from "react";
import { LessonType, getLesson } from "./lesson.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdxProse } from "./MdxProse";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const Lesson = async ({
  lessonId,
  courseId,
}: {
  lessonId: string;
  courseId: string;
}) => {
  const session = await getRequiredAuthSession();
  const lesson = await getLesson(lessonId, session.user.id);

  if (!lesson) {
    notFound();
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      users: {
        where: {
          id: session.user.id ?? "-",
          canceledAt: null,
        },
      },
    },
  });

  if (lesson.state !== "PUBLIC" && !isAuthorized?.users.length) {
    throw new Error("Unauthorized");
  }
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <MdxProse markdown={lesson.content} />
      </CardContent>
    </Card>
  );
};
