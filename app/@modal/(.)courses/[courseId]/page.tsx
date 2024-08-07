import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getCourse } from "../../../courses/[courseId]/course.query";
import { CourseDialog } from "./CourseDialog";
import { Course } from "../../../courses/[courseId]/Course";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  const course = await getCourse({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }
  return (
    <CourseDialog course={course}>
      <Course course={course} userId={session.user.id} />
    </CourseDialog>
  );
}
