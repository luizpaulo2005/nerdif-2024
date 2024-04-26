"use client";
import { CreateTeamForm } from "@/components/create-team-form";
import { User } from "@/components/user";
import { userHasTeam } from "@/data/team";
import Image from "next/image";
import Logo from "/public/logo.png";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { data: hasTeam } = useQuery({
    queryKey: ["hasTeam"],
    // @ts-ignore
    queryFn: () => userHasTeam(),
  });

  return (
    <div className="flex py-2 max-w-3xl pl-px mx-auto justify-between">
      <div className="flex items-center gap-2">
        <span className="font-semibold">NerdIF 2024</span>
        <Image className="size-10 rounded-md" src={Logo} alt="Logo" />
      </div>
      {hasTeam !== undefined && !hasTeam && <CreateTeamForm />}
      <User />
    </div>
  );
};

export { Navbar };
