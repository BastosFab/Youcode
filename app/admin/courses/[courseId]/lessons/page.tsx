import { SubmitButton } from "@/components/form/SubmitButton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminLessonItem } from "./AdminLessonItem";
import { getCourseLessons } from "./lessons.query";

export default async function CourseLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const sessions = await getRequiredAuthSession();

  const course = await getCourseLessons({
    courseId: params.courseId,
    creatorId: sessions.user.id,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons • {course?.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              {course?.lessons.map((lesson) => (
                <AdminLessonItem key={lesson.id} lesson={lesson} />
              ))}
            </div>
            <form>
              <SubmitButton
                variant={"secondary"}
                size={"sm"}
                className="w-full"
                formAction={async () => {
                  "use server";
                  const session = await getRequiredAuthSession();

                  const courseId = params.courseId;

                  await prisma.course.findFirstOrThrow({
                    where: {
                      id: courseId,
                      creatorId: session.user.id,
                    },
                  });

                  const newLesson = await prisma.lesson.create({
                    data: {
                      name: "New lesson",
                      course: {
                        connect: {
                          id: courseId,
                        },
                      },
                      rank: "aaa",
                      state: "HIDDEN",
                      content: "## New lesson content",
                    },
                  });

                  redirect(
                    `/admin/courses/${courseId}/lessons/${newLesson.id}`
                  );
                }}
              >
                Create lesson
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
