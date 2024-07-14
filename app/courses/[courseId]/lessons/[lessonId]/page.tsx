import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import React from "react";
import { getLesson } from "./lesson.query";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LessonsNavigation } from "./LessonsNavigation";
import { Lesson } from "./Lesson";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function page({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const session = await getRequiredAuthSession();
  const lesson = await getLesson(params.lessonId, session.user.id);

  if (!lesson) {
    notFound();
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: params.courseId,
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
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>
            You need to be authorized to view this lesson
          </LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Link
            href={`/courses/${params.courseId}`}
            className={buttonVariants()}
          >
            Join now
          </Link>
        </LayoutContent>
      </Layout>
    );
  }

  return (
    <div className="flex items-start gap-4 p-4">
      <LessonsNavigation courseId={params.courseId} />
      <Lesson lesson={lesson} />
    </div>
  );
}
