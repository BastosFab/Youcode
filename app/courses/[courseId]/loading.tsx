import React from "react";
import { CoursePlaceholder } from "./CoursePlaceholder";
import {
  LayoutHeader,
  LayoutTitle,
  LayoutContent,
  Layout,
} from "@/components/layout/layout";

export default function loading() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="">
        <CoursePlaceholder />
      </LayoutContent>
    </Layout>
  );
}
