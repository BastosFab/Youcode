"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { getAuthSession } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

export const LoginButton = () => {
  const mutation = useMutation({
    mutationFn: async () => signIn(),
  });
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="gap-2"
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? <Loader size={12} /> : <LogIn size={12} />}
      Login
    </Button>
  );
};
