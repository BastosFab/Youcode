"use client"; // Error components must be Client Components

import { LoginButton } from "@/components/features/auth/LoginButton";
import { NotAuthentificatedCard } from "@/components/features/error/NotAuthentificatedCard";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <NotAuthentificatedCard />;
}
