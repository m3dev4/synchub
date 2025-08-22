import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SyncHub - Sign-In",
};

export const signInLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default signInLayout;
