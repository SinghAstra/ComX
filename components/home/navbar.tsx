"use client";

import { logOutUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { User } from "@prisma/client";
import { HomeIcon, Loader, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  currentUser: User;
}

export function Navbar({ currentUser }: NavbarProps) {
  const handleLogout = async () => {
    await logOutUser("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-2">
        <Link href="/home">
          <div className="flex items-center space-x-2 ">
            <Loader className="h-6 w-6 text-primary" />{" "}
            <span className="text-lg font-semibold text-foreground">
              {siteConfig.name}
            </span>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full border hover:bg-muted/40"
            >
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">
                {currentUser.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
            <DropdownMenuItem
              asChild
              className="hover:bg-muted/40 transition-all duration-200 cursor-pointer"
            >
              <Link
                href={`/profile/${currentUser.id}`}
                className="flex items-center"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:bg-muted/40 transition-all duration-200 cursor-pointer"
            >
              <Link href="/settings/profile" className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-muted/40 transition-all duration-200 cursor-pointer"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
