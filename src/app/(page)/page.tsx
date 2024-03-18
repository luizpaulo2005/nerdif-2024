"use client";

import { TeamCard } from "@/components/card-team";
import { getTeams } from "@/data/team";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data } = useQuery<Team[] | undefined>({
    queryKey: ["teams"],
    queryFn: () => getTeams(),
  });
  return (
    <div className="min-w-screen flex justify-center gap-2 flex-wrap">
      {data?.map((team) => {
        return <TeamCard key={team.id} team={team} />;
      })}
    </div>
  );
};

export default Page;
