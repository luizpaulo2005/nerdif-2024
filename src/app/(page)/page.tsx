"use client";

import { TeamCard } from "@/components/card-team";
import { TeamsFilters } from "@/components/teams-filter";
import { getTeams } from "@/data/team";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

const Page = () => {
  const [name] = useQueryState("name");
  const [game] = useQueryState("game");

  const { data } = useQuery<Team[] | undefined>({
    queryKey: ["teams", name, game],
    queryFn: () =>
      getTeams({
        name,
        game,
      }),
  });
  return (
    <div className="max-w-7xl flex flex-col gap-2 mx-auto p-2">
      <TeamsFilters />
      <div className="flex flex-row justify-center gap-2 flex-wrap">
        {data && data.length > 0 ? data.map((team) => {
          return <TeamCard key={team.id} team={team} />;
        }) : <p>Sem times</p>}
      </div>
    </div>
  );
};

export default Page;
