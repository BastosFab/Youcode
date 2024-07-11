import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminLesson } from "./admin-lesson.query";
import { notFound } from "next/navigation";
import { LessonDetailsForm } from "./form/LessonDetailsForm";

export default async function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const sessions = await getRequiredAuthSession();

  const lesson = await getAdminLesson({
    lessonId: params.lessonId,
    userId: sessions.user.id,
  });

  if (!lesson) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons • {lesson?.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonDetailsForm defaultValues={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
