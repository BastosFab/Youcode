import React from "react";
import { LessonType } from "./lesson.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdxProse } from "./MdxProse";

export type LessonProps = {};

export const Lesson = ({ lesson }: { lesson: LessonType }) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <MdxProse markdown={lesson.content} />
      </CardContent>
    </Card>
  );
};
