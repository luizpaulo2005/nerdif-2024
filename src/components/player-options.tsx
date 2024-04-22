import { Check, Undo2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Submission } from "@/types/submission";
import axios from "axios";
import { toast } from "sonner";

interface PlayerOptionsProps {
  player: Submission;
}

const PlayerOptions = (props: PlayerOptionsProps) => {
  const { player } = props;

  const setPlayerStatus = async (status: Submission["status"]) => {
    await axios
      .patch(`/api/submission/${player.id}?status=${status}`)
      .then(() => {
        toast.success("Status do jogador alterado com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error(
          `Erro ao alterar o status do jogador: ${error.response.data.message} ${error.response.status}`
        );
      });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        className="bg-green-500 hover:bg-green-400 transition-colors"
        size="icon"
        onClick={() => setPlayerStatus("accepted")}
        disabled={player.status !== "pending"}
      >
        <Check />
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-400 transition-colors"
        size="icon"
        onClick={() => setPlayerStatus("rejected")}
        disabled={player.status !== "pending"}
      >
        <X />
      </Button>
      <Button
        onClick={() => setPlayerStatus("pending")}
        size="icon"
        disabled={player.status === "pending"}
      >
        <Undo2 />
      </Button>
    </div>
  );
};

export { PlayerOptions };
