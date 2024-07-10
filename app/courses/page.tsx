import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import React from "react";
import { getCourses } from "./courses.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CourseCard } from "./CourseCard";
import { NotAuthentificatedCard } from "@/components/features/error/NotAuthentificatedCard";

export default async function CoursesPage() {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return <NotAuthentificatedCard />;
  }

  const courses = await getCourses(session.user.id);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
