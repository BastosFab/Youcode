"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  AdminLessonItem,
  LessonAdminItemSortableItem,
} from "./AdminLessonItem";
import { AdminLessonItemType } from "./lessons.query";
import { toast } from "sonner";
import { saveLessonMove } from "./lesson.action";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type AdminLessonSortableProps = {
  items: AdminLessonItemType[];
};

export const AdminLessonSortable = ({
  items: defaultItems,
}: AdminLessonSortableProps) => {
  const [items, setItems] = useState(defaultItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      activeId,
      newUpItem,
      newDownItem,
    }: {
      activeId: string;
      newUpItem: string | undefined;
      newDownItem: string | undefined;
    }) => {
      const { data, serverError } = await saveLessonMove({
        lessonId: activeId,
        upItemRannk: newUpItem,
        downItemRannk: newDownItem,
      });
      if (serverError) {
        toast.error(serverError);
        return;
      }

      if (!data) {
        toast.error("Server error");
        return;
      }

      router.refresh();

      setItems((prevItems) => {
        const activeItem = prevItems.find((item) => item.id === activeId);
        if (!activeItem) return prevItems;

        activeItem.rank = data.newRank;
        return [...prevItems];
      });
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      toast.error("You can't drop here");
      return;
    }
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        const newUpItem = newItems[newIndex - 1]?.rank;

        const newDownItem = newItems[newIndex + 1]?.rank;

        mutation.mutate({
          activeId: String(active.id),
          newUpItem,
          newDownItem,
        });

        return newItems;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        disabled={mutation.isPending}
      >
        <div
          className={cn("flex flex-col gap-2", {
            "opacity-50": mutation.isPending,
          })}
        >
          {items.map((lesson, index) => (
            <LessonAdminItemSortableItem
              key={lesson.id}
              lesson={lesson}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
