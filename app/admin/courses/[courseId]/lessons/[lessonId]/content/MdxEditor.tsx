"use client";

import React, { useEffect, useState } from "react";
import InitializedMDXEditor from "./InitializedMDXEditor";
import { lessonActionEditContent } from "../lesson.action";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { toast } from "sonner";

export type MdxEditorProps = {
  lessonId: string;
  markdown: string;
};

type SyncState = "sync" | "not-sync" | "syncing";

export const getBadgeVariant = (
  syncState: SyncState
): BadgeProps["variant"] => {
  if (syncState === "sync") {
    return "default";
  }
  if (syncState === "not-sync") {
    return "destructive";
  }
  if (syncState === "syncing") {
    return "secondary";
  }
};

export const MdxEditor = ({ lessonId, markdown }: MdxEditorProps) => {
  const [syncState, setSyncState] = useState<SyncState>("sync");

  const onChange = async (value: string) => {
    setSyncState("syncing");

    const { data, serverError } = await lessonActionEditContent({
      lessonId,
      markdown: value,
    });

    if (serverError) {
      setSyncState("not-sync");
      toast.error(serverError);
      return;
    }

    setSyncState("sync");
  };

  useEffect(() => {
    if (syncState === "sync") return;

    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? All unsaved changes will be lost.";
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [syncState]);

  return (
    <div className="relative">
      <div className="absolute bottom-2 right-2 z-10">
        <Badge variant={getBadgeVariant(syncState)}>{syncState}</Badge>
      </div>
      <InitializedMDXEditor
        onChange={(v) => {
          setSyncState("not-sync");
          onChange(v);
        }}
        markdown={markdown}
      />
    </div>
  );
};
