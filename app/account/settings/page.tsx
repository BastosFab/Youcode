import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { NotAuthentificatedCard } from "@/components/features/error/NotAuthentificatedCard";
import { z } from "zod";
import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SettingsAction } from "./settings.action";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type SettingsFormProps = {
  name: string;
  image: string;
};

const SettingsSchema = z.object({
  image: z.string().url(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
});

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  if (!session) {
    return <NotAuthentificatedCard />;
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Account settings</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-6">
            <form
              className="flex flex-col gap-4"
              action={async (formData) => {
                "use server";

                const userSession = await getRequiredAuthSession();

                const image = formData.get("image");
                const name = formData.get("name");

                const safeData = SettingsSchema.safeParse({
                  image,
                  name,
                });

                if (!safeData.success) {
                  const searchParams = new URLSearchParams();
                  searchParams.set(
                    "error",
                    "Invalid data. Image must be an URL and name must be between 3 and 50 characters."
                  );
                  redirect(`/account/settings?${searchParams.toString()}`);
                }

                SettingsAction({
                  image: safeData.data.image,
                  name: safeData.data.name,
                });

                revalidatePath("/account");
                redirect("/account");
              }}
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  defaultValue={session.user.image}
                  name="image"
                  id="image"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input defaultValue={session.user.name} name="name" id="name" />
              </div>
              {searchParams.error && (
                <Typography>Error: {searchParams.error as string}</Typography>
              )}
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
