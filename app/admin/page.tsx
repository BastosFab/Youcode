import { NotAuthorized } from "@/components/layout/NotAuthorized";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function AdminPage() {
  const adminSession = await getRequiredAuthSession();

  if (adminSession.user.role !== "ADMIN") {
    return <NotAuthorized />;
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Admin</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Link href="/admin/courses">Courses</Link>
      </LayoutContent>
    </Layout>
  );
}
