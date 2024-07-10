"use server";

import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SettingsFormProps } from "./page";

export const SettingsAction = async ({ image, name }: SettingsFormProps) => {
  const session = await getRequiredAuthSession();

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image,
      name,
    },
  });
};
