import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { getAdminCourse } from "./admin-course.query";
import { PaginationButton } from "@/components/features/pagination/PaginationButton";
import { Menu } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);

  const session = await getRequiredAuthSession();

  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  if (!course) {
    return <Typography>Course not found</Typography>;
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 flex min-h-[386px] flex-col justify-between">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[100px] text-right">Status</TableHead>
                  <TableHead className="w-[100px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.users?.map((user) => (
                  <TableRow>
                    <TableCell className="font-medium">
                      <Avatar className="rounded-full">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.email ?? "user picture"}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.canceled ? "success" : "destructive"}
                      >
                        {user.canceled ? "Active" : "Canceled"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"} size={"sm"}>
                            <Menu />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <form>
                              <button
                                formAction={async () => {
                                  "use server";

                                  const session =
                                    await getRequiredAuthSession();

                                  const userId = user.id;
                                  const courseId = params.courseId;

                                  const courseOnUser =
                                    await prisma.courseOnUser.findFirst({
                                      where: {
                                        userId,
                                        course: {
                                          id: courseId,
                                          creatorId: session.user.id,
                                        },
                                      },
                                    });

                                  if (!courseOnUser) return;

                                  await prisma.courseOnUser.update({
                                    where: {
                                      id: courseOnUser.id,
                                    },
                                    data: {
                                      canceledAt: courseOnUser.canceledAt
                                        ? null
                                        : new Date(),
                                    },
                                  });

                                  revalidatePath(`/admin/courses/${courseId}`);
                                }}
                              >
                                {user.canceled ? "Cancel" : "Activate"}
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationButton
              page={page}
              baseUrl={`/admin/courses/${course.id}`}
              totalPage={course._count?.users ?? 0 / 5}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            {course.image && (
              <Avatar className="rounded">
                <AvatarFallback>{course.name?.[0]}</AvatarFallback>
                {course.image && (
                  <AvatarImage
                    src={course.image}
                    alt={course.name ?? "course picture"}
                  />
                )}
              </Avatar>
            )}
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {course._count?.users ? (
              <Typography>{course._count.users} users</Typography>
            ) : (
              <Typography>0 users</Typography>
            )}
            {course._count?.lessons ? (
              <Typography>{course._count.lessons} lessons</Typography>
            ) : (
              <Typography>0 lessons</Typography>
            )}
            <div className="flex flex-col gap-2">
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={`/admin/courses/${course.id}/edit`}
              >
                Edit
              </Link>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={`/admin/courses/${course.id}/lessons`}
              >
                Edit lessons
              </Link>
            </div>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
