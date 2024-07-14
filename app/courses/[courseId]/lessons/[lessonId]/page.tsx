import { Suspense } from "react";
import { Lesson } from "./Lesson";
import { LessonSkeleton } from "./LessonSkeleton";
import { LessonsNavigation } from "./LessonsNavigation";
import { LessonsNavigationSkeleton } from "./LessonsNavigationSkeleton";

export default async function page({
  params,
}: {
  params: {
    lessonId: string;
    courseId: string;
  };
}) {
  return (
    <div className="flex items-start gap-4 p-4">
      <Suspense fallback={<LessonsNavigationSkeleton />}>
        <LessonsNavigation courseId={params.courseId} />
      </Suspense>
      <Suspense fallback={<LessonSkeleton />}>
        <Lesson {...params} />
      </Suspense>
    </div>
  );
}
