"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export type PaginationButtonProps = {
  totalPage: number;
  page: number;
  baseUrl: string;
};

export const PaginationButton = (props: PaginationButtonProps) => {
  const router = useRouter();
  return (
    <div className="mt-2 flex justify-between">
      <Button
        variant={"outline"}
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(props.page - 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Previous
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(props.page + 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Next
      </Button>
    </div>
  );
};