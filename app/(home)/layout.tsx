import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = async ({ children }: HomeLayoutProps) => {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return children;
};

export default HomeLayout;
