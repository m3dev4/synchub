import { headers } from "next/headers";
import { auth } from "./auth";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const getUser = async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    return {
      sucess: false,
      message: "Unauthorized - User not authenticated",
    };
  }
  return session?.user;
};
