"use client";
import { Button } from "@/components/ui/button";
import { Team } from "@/types/team";
import axios from "axios";
import { BookmarkPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CreateSubmissionButtonProps {
  team: Team;
}

const CreateSubmissionButton = (props: CreateSubmissionButtonProps) => {
  const { team } = props;
  const { status } = useSession();

  const handleCreateSubmission = async () => {
    toast.loading("Solicitando participação...");

    await axios
      .post("/api/submission", {
        teamId: team.id,
      })
      .then(() => {
        toast.success("Participação solicitada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        toast.error("Erro ao solicitar participação!");
      });
  };

  return (
    <Button
      className="self-end flex items-center gap-2"
      onClick={handleCreateSubmission}
      disabled={status !== "authenticated"}
    >
      <BookmarkPlus />
      Solicitar participação
    </Button>
  );
};

export { CreateSubmissionButton };
