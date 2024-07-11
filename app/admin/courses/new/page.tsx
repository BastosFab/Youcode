import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { CourseForm } from "../[courseId]/edit/CourseForm";

export default async function NewCoursePage() {
  const session = await getRequiredAuthSession();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex w-full items-center justify-between">
          Courses
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <CourseForm />
      </LayoutContent>
    </Layout>
  );
}
