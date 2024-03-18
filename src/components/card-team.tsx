"use client";
import CounterStrikeLogo from "@/assets/counter-strike.png";
import FreeFireLogo from "@/assets/free-fire.png";
import LoLLogo from "@/assets/league-of-legends.png";
import ValorantLogo from "@/assets/valorant.png";
import XadrezLogo from "@/assets/xadrez.png";
import { PlayerOptions } from "@/components/player-options";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Team } from "@/types/team";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface TeamCardProps {
  team: Team;
}

const TeamCard = (props: TeamCardProps) => {
  const { team } = props;
  const { data } = useSession();

  const logos = {
    "League of Legends": LoLLogo,
    Valorant: ValorantLogo,
    "Free Fire": FreeFireLogo,
    Xadrez: XadrezLogo,
    "Counter Strike": CounterStrikeLogo,
  };

  const status = {
    accepted: "Aceito",
    pending: "Pendente",
    rejected: "Rejeitado",
  };

  return (
    <div className="flex px-4 py-3 max-w-xl w-full space-y-3 flex-col border rounded-md">
      <div className="flex gap-1 items-center justify-center">
        <Image
          src={logos[team.game.name]}
          alt={team.game.name}
          className="max-w-32 w-fit max-h-10 h-fit rounded-md"
        />
        <p className="font-semibold">{team.name}</p>
      </div>
      {team.owner.email === data?.user?.email
        ? team.players.map((player) => {
            return (
              <p
                key={player.userId}
                className="flex gap-1 items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={player.user.imageUrl} />
                  </Avatar>
                  <p
                    className={`
                ${player.status === "accepted" && "text-green-500"}
                ${player.status === "rejected" && "line-through text-red-500"}
                ${player.status === "pending" && "text-yellow-500"}
                `}
                  >
                    {player.user.name} -{" "}
                    {player.user.id === team.ownerId
                      ? "(Dono)"
                      : status[player.status]}
                  </p>
                </span>
                {team.ownerId !== player.userId && (
                  <PlayerOptions player={player} />
                )}
              </p>
            );
          })
        : team.players
            .filter(
              (player) =>
                player.status !== "rejected" && player.status !== "pending"
            )
            .map((player) => {
              return (
                <p key={player.userId} className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={player.user.imageUrl} />
                  </Avatar>
                  {player.user.name}{" "}
                  {player.user.id === team.ownerId && "(Dono)"}
                </p>
              );
            })}
    </div>
  );
};

export { TeamCard };
