"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import {
  BellIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  ShoppingCart,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DropdownMenuAvatar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user?.image || "/avatar.png"} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LayoutDashboardIcon />
            <Link href={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ShoppingCart />
            Cart
          </DropdownMenuItem>

          <DropdownMenuItem>
            <UserCheck />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
