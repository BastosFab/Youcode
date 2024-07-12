import { Typography } from "@/components/ui/Typography";
import { Circle, CircleCheck, CircleDashed } from "lucide-react";
import Link from "next/link";
import { CourseLessonItem } from "../../course.query";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonItemPlaceholder = () => {
  return (
    <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <CircleDashed size={16} />

      <Skeleton className="h-6 w-full" />
    </div>
  );
};
