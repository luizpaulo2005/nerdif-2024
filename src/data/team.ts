import { Team } from "@/types/team";
import { User } from "@/types/user";
import axios from "axios";
import { toast } from "sonner";

interface GetTeamsFilters {
  name: string | null;
  game: string | null;
}

const getTeams = async ({ name, game }: GetTeamsFilters) => {
  let teams: Team[] | undefined;

  await axios
    .get("/api/team")
    .then((response) => {
      teams = response.data;
    })
    .catch((error) => {
      toast.error(
        `Erro ao buscar times: ${error.response.data.message} ${error.response.status}`
      );
    });

  if (name) {
    teams = teams?.filter((team) => team.name.includes(name));
  }

  if (game) {
    teams = teams?.filter((team) => team.game.name.includes(game));
  }

  return teams;
};

const userHasTeam = async () => {
  let user: User | undefined;

  await axios.get("/api/user").then((response) => {
    user = response.data;
  });

  return user?.Team ? true : false;
};

export { getTeams, userHasTeam };
