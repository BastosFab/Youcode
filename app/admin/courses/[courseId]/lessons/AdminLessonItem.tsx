import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "lucide-react";
import Link from "next/link";
import { AdminLessonItemType } from "./lessons.query";
import { Button } from "@/components/ui/button";

export type AdminLessonItemProps = {
  lesson: AdminLessonItemType;
  index: number;
};

export const AdminLessonItem = ({ lesson }: AdminLessonItemProps) => {
  return (
    <Link href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Typography variant={"large"}>{lesson.name}</Typography>
        <div className="ml-auto flex gap-2">
          <Badge className="ml-auto">{lesson.state}</Badge>
          <Menu />
        </div>
      </div>
    </Link>
  );
};

export function LessonAdminItemSortableItem({
  lesson,
  index,
}: AdminLessonItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    activeIndex,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: activeIndex === index ? 999 : 0,
  };

  return (
    <Link href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div ref={setNodeRef} style={style} {...attributes}>
        <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
          <Typography variant={"large"}>{lesson.name}</Typography>
          <div className="ml-auto flex gap-2">
            <Badge className="ml-auto">{lesson.state}</Badge>
            <div
              onClickCapture={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Button
                variant={"ghost"}
                size={"sm"}
                className="cursor-move"
                {...listeners}
              >
                <Menu />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
