import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { CourseForm } from "../[courseId]/edit/CourseForm";

export default async function NewCoursePage() {
  const session = await getRequiredAuthSession();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex w-full items-center justify-between">
          Courses
          <Link
            href={"/admin/courses/new"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            New course
          </Link>
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <CourseForm />
      </LayoutContent>
    </Layout>
  );
}
