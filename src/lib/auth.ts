// src/lib/auth.
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse];

export const getAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  const session = await getServerSession(...parameters, authOptions);
  return session;
};

export const getRequiredAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  const session = await getServerSession(...parameters, authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  return session as {
    user: {
      id: string;
      email?: string;
      image?: string;
      name?: string;
    };
  };
};

// export const getRequiredAdminAuthSession = async (
//   ...parameters: ParametersGetServerSession
// ) => {
//   const session = await getServerSession(...parameters, authOptions);

//   if (!session?.user.id) {
//     throw new Error("Unauthorized");
//   }

//   if (session.user.role !== "ADMIN") {
//     redirect("/");
//   }

//   return session as {
//     user: {
//       id: string;
//       email?: string;
//       image?: string;
//       name?: string;
//       role?: string;
//     };
//   };
// };
