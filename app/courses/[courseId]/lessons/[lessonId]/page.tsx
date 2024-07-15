import { SubmitButton } from "@/components/form/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { MdxProse } from "./MdxProse";
import { OpenLessonNavigationButton } from "./OpenLessonNavigationButton";
import { handleLessonState } from "./lesson.action";
import { getLesson } from "./lesson.query";

export default async function page({
  params: { lessonId, courseId },
}: {
  params: {
    lessonId: string;
    courseId: string;
  };
}) {
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
          userId: session?.user.id ?? "-",
          canceledAt: null,
        },
      },
    },
  });

  if (lesson.state !== "PUBLIC" && !isAuthorized?.users.length) {
    throw new Error("Unauthorized");
  }

  if (lesson.users.length === 0 && session.user.id) {
    await prisma.lessonOnUser.create({
      data: {
        userId: session.user.id,
        lessonId: lesson.id,
      },
    });
  }

  return (
    <Card className="flex-1">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <OpenLessonNavigationButton />
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <MdxProse markdown={lesson.content} />
        <form className="m-auto mt-4 flex max-w-2xl flex-row-reverse">
          <SubmitButton
            formAction={async () => {
              "use server";

              const { data, serverError } = await handleLessonState({
                lessonId: lesson.id,
                progress:
                  lesson.progress === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
              });

              if (serverError) {
                throw serverError;
              }

              if (data) {
                redirect(
                  `/courses/${data.updatedLessonOnUser.lesson.courseId}/lessons/${data.nextLesson.id}`
                );
              }
            }}
          >
            {lesson.progress === "COMPLETED"
              ? "Mark as in progress"
              : "Completed"}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
