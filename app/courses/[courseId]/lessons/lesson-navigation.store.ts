"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type LessonNavigationType = "open" | "closed" | "sticky";

type LessonNavigationStore = {
  state: LessonNavigationType;
  setState: (state: LessonNavigationType) => void;
};

export const useLessonNavigationStore = create(
  persist<LessonNavigationStore>(
    (set, get) => ({
      state: "sticky",
      setState: (state) => set({ state }),
    }),
    {
      name: "lesson-navigation-storage", // name of the item in the storage (must be unique)
    }
  )
);

export const useLessonNavigationState = () => {
  const state = useLessonNavigationStore((state) => state.state);
  const isLg = useMediaQuery("(min-width: 1024px)");

  if (isLg) {
    return state;
  }

  if (state === "sticky") {
    return "closed";
  }

  return state;
};
