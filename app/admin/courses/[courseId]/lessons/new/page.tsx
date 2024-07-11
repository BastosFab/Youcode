import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";
import React from "react";
import { CourseForm } from "../../edit/CourseForm";
import Link from "next/link";

export default async function CreateLessonPage() {
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
