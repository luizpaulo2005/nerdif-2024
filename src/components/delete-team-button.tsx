import { Team } from "@/types/team";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";

interface deleteTeamButtonProps {
  teamId: Team["id"];
}

const DeleteTeamButton = (props: deleteTeamButtonProps) => {
  const { teamId } = props;

  const handleDeleteTeam = async () => {
    toast.loading("Apagando time...");

    await axios
      .delete(`/api/team/${teamId}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Time apagado com sucesso");
          setTimeout(() => window.location.reload(), 2000)
        }
      })
      .catch((err) => toast.error("Erro ao apagar time"));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex gap-2 items-center self-end"
          variant="destructive"
        >
          <Trash2 />
          Apagar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja apagar este time?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteTeam()}>
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteTeamButton };
