import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { LessonItem } from "./LessonItem";
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
                <LessonItem key={lesson.id} lesson={lesson} />
              ))}
            </div>
            <Button variant={"outline"} size={"sm"}>
              Create lesson
            </Button>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
