import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import React from "react";
import { LessonItem } from "./LessonItem";
import { getCourse } from "../../course.query";
import { notFound } from "next/navigation";

export type LessonsNavigationProps = {
  courseId: string;
};

export const LessonsNavigation = async ({
  courseId,
}: LessonsNavigationProps) => {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId,
    userId: session?.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Card className="max-w-xs flex-1">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {course?.lessons.map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}
      </CardContent>
    </Card>
  );
};
