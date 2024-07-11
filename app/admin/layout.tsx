"use client";

import { Breadcrumb } from "@/components/features/breadcrumb/Breadcrumb";
import { BackButton } from "@/components/features/button/BackButton";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <>
      <div className="w-full border-b border-border/20">
        <div className="m-auto flex max-w-3xl items-center gap-2 px-4 py-1">
          <BackButton variant="ghost" size="sm">
            Back
          </BackButton>
          <Breadcrumb />
        </div>
      </div>
      {children}
    </>
  );
}
