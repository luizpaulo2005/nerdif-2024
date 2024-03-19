import axios from "axios";
import { toast } from "sonner";

const getGames = async () => {
  let games;
  await axios
    .get("/api/game")
    .then((response) => {
      games = response.data;
    })
    .catch((error: any) => {
      toast.error(
        `Erro ao buscar jogos: ${error.response.data.message} ${error.response.status}`
      );
    });

  return games;
};

export { getGames };
