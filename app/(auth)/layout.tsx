import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return children;
};

export default AuthLayout;
