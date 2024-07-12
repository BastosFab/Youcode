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
import { MdxEditor } from "./content/MdxEditor";

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
    <Layout className="max-w-5xl">
      <LayoutHeader>
        <LayoutTitle>Lessons • {lesson?.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonDetailsForm defaultValues={lesson} />
          </CardContent>
        </Card>
        <Card className="flex-[3]">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <MdxEditor lessonId={lesson.id} markdown={lesson.content} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
