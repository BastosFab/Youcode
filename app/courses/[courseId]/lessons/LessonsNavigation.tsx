import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getCourse } from "../course.query";
import { LessonNavigationCard } from "./LessonNavigationCard";

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

  return <LessonNavigationCard course={course} />;
};
