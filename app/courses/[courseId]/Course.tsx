import React from "react";
import { CourseType } from "./course.query";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarkdownProse } from "@/components/features/mdx/MarkdownProse";
import { LessonItem } from "./lessons/[lessonId]/LessonItem";

export type CourseProps = {
  course: CourseType;
};

export const Course = ({ course }: CourseProps) => {
  return (
    <div className="flex flex-col items-start gap-4 lg:flex-row">
      <Card className="flex-[2] hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar className="size-14 rounded">
            <AvatarFallback>{course.name[0]}</AvatarFallback>
            {course.image ? <AvatarImage src={course.image} /> : null}
          </Avatar>
          <div className="flex flex-col gap-3">
            <CardTitle>{course.name}</CardTitle>
            <div className="flex flex-row gap-2">
              <Avatar className="size-8">
                <AvatarFallback>{course.name[0]}</AvatarFallback>
                {course.creator.image ? (
                  <AvatarImage src={course.creator.image} />
                ) : null}
              </Avatar>
              <Typography variant="large" className=" text-muted-foreground">
                {course.creator.name}
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MarkdownProse markdown={course.presentation} />
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
