import {
  LayoutHeader,
  LayoutTitle,
  LayoutContent,
  Layout,
  LayoutActions,
} from "@/components/layout/layout";
import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Admin</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Loader />
      </LayoutActions>
      <LayoutContent>
        <Skeleton className="h-20 w-full" />
      </LayoutContent>
    </Layout>
  );
}
