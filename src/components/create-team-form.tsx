"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/data/game";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Game } from "@/types/game";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";

const CreateTeamSchema = z.object({
  name: z.string().nonempty("O nome do time não pode ser vazio"),
  gameId: z.string().nonempty("O jogo do time não pode ser vazio"),
});

type CreateTeamForm = z.infer<typeof CreateTeamSchema>;

type Status = "idle" | "sending" | "error" | "success";

const statusMessages = {
  idle: "Adicionar",
  sending: "Adicionando...",
  error: "Erro ao adicionar",
  success: "Adicionado com sucesso",
};

const CreateTeamForm = () => {
  const [status, setStatus] = useState<Status>("idle");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeamForm>({
    resolver: zodResolver(CreateTeamSchema),
  });

  const { data } = useQuery<Game[] | undefined>({
    queryKey: ["games"],
    queryFn: () => getGames(),
  });

  const handleCreateTeam = async (data: CreateTeamForm) => {
    setStatus("sending");
    toast("Adicionando item...");

    await axios
      .post("/api/team", data)
      .then(() => {
        setStatus("success");
        toast.success("Time adicionado com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        setStatus("error");
        toast.error(
          `Erro ao adicionar o time: ${error.response.data.message} ${error.response.status}`
        );
      })
      .finally(() => {
        setTimeout(() => {
          setStatus("idle");
        }, 3000);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          <Plus />
          Criar um time
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar um time</DialogTitle>
          <DialogDescription>
            Use o formulário abaixo para criar um time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateTeam)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input {...register("name")} />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Jogo</Label>
            <Controller
              name="gameId"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Select onValueChange={onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          data ? "Selecione um jogo" : "Carregando jogos..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.map((game) => (
                        <SelectItem key={game.id} value={game.id}>
                          {game.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.gameId && (
              <span className="text-red-500">{errors.gameId.message}</span>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Sair
              </Button>
            </DialogClose>
            <Button
              disabled={status !== "idle"}
              data-error={status === "error"}
              data-success={status === "success"}
              data-sending={status === "sending"}
              className="transition-colors data-[success==true]:!bg-green-500 data-[error==true]:!bg-red-500 data-[sending==true]:!bg-gray-500 flex items-center gap-2"
              type="submit"
            >
              {status === "sending" && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {statusMessages[status]}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateTeamForm };
