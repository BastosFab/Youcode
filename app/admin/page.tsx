import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Layout } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Link href="/admin/courses">Courses</Link>
      </LayoutContent>
    </Layout>
  );
}
