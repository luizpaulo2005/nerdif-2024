import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Team } from "@/types/team";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";

interface LeaveTeamButtonProps {
  team: Team;
}

const LeaveTeamButton = (props: LeaveTeamButtonProps) => {
  const { team } = props;
  const { status, data } = useSession();

  const handleLeaveTeam = async () => {
    const submission = team.players.find(
      (player) => player.user.email === data?.user?.email
    );

    if (submission) {
      toast.loading("Removendo submissão...");

      await axios
        .delete(`/api/submission/${submission.id}`)
        .then(() => {
          toast.success("Submissão removida com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(() => {
          toast.error("Erro ao remover submissão!");
        });
    }
  };

  return (
    <Button
      className="self-end flex items-center gap-2"
      onClick={handleLeaveTeam}
      disabled={status !== "authenticated"}
    >
      <LogOut />
      Remover Submissão
    </Button>
  );
};

export { LeaveTeamButton };
