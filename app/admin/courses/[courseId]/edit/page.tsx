import { NotAuthentificatedCard } from "@/components/features/error/NotAuthentificatedCard";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CourseForm } from "./CourseForm";
import { NotAuthorized } from "@/components/layout/NotAuthorized";

export default async function EditCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  if (!session) {
    return <NotAuthentificatedCard />;
  }

  if (session.user.role !== "ADMIN") {
    return <NotAuthorized />;
  }

  const course = await prisma.course.findUnique({
    where: {
      creatorId: session.user.id,
      id: params.courseId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      presentation: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <CourseForm defaultValues={course} />
      </LayoutContent>
    </Layout>
  );
}
