"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { ToggleThemeButton } from "./change-theme-dropdown";

const User = () => {
  const { data, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center gap-1">
        <ToggleThemeButton isAuthenticated={false} />
        <Button onClick={() => signIn("google")}>Entrar</Button>
      </div>
    );
  }

  if (data && data.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span>
            <UserAvatar user={data.user} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>{data?.user?.name}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <ToggleThemeButton isAuthenticated={true} />
          <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export { User };
