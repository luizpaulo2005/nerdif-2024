import axios from "axios";
import { toast } from "sonner";

const getTeams = async () => {
  let teams;

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

  return teams;
};

export { getTeams };
