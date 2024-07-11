import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export const BackButton = (props: ButtonProps) => {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={(e) => {
        router.back();
        props?.onClick?.(e);
      }}
    >
      {props.children}
    </Button>
  );
};
