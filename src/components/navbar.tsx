import { User } from "@/components/user";
import Image from "next/image";
import Logo from "/public/logo.png";
import { CreateTeamForm } from "@/components/create-team-form";

const Navbar = () => {
  return (
    <div className="flex justify-around p-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold">NerdIF 2024</span>
        <Image className="size-10 rounded-md" src={Logo} alt="Logo" />
      </div>
      <CreateTeamForm />
      <User />
    </div>
  );
};

export { Navbar };
