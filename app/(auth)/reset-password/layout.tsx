import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SyncHub - Reset Password",
};

export const resetPasswordLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

export default resetPasswordLayout;
