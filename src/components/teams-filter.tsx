"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { useQueryState } from "nuqs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getGames } from "@/data/game";
import { Game } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Search, Trash2 } from "lucide-react";

const teamsFiltersSchema = z.object({
  name: z.string(),
  game: z.string(),
});

type TeamsFilters = z.infer<typeof teamsFiltersSchema>;

const TeamsFilters = () => {
  const [name, setName] = useQueryState("name");
  const [game, setGame] = useQueryState("game");

  const { register, handleSubmit, control } = useForm<TeamsFilters>({
    resolver: zodResolver(teamsFiltersSchema),
    values: {
      name: name ?? "",
      game: game ?? "",
    },
  });

  const { data } = useQuery<Game[] | undefined>({
    queryKey: ["games"],
    queryFn: () => getGames(),
  });

  const clearFilters = () => {
    setName(null);
    setGame(null);
  };

  const handleFilterTeam = (data: TeamsFilters) => {
    const { name, game } = data;

    if (name) {
      setName(name);
    } else {
      setName(null);
    }

    if (game) {
      setGame(game);
    } else {
      setGame(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFilterTeam)} className="">
      <div className="flex flex-wrap max-w-3xl items-center gap-2 mx-auto">
        <Input className="min-w-60 flex-1" {...register("name")} placeholder="Nome do time" />
        <Controller
          control={control}
          name="game"
          render={({ field: { onChange, value } }) => {
            return (
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="min-w-72 flex-1">
                  <SelectValue
                    placeholder={
                      data ? "Selecione um jogo" : "Carregando jogos..."
                    }
                  />
                </SelectTrigger>
                <SelectContent >
                  {data?.map((game) => (
                    <SelectItem key={game.id} value={game.name}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
        <Button onClick={clearFilters} size="icon" className="p-2 self-center">
          <Trash2 />
        </Button>
        <Button className="flex items-center gap-2 flex-1 md:max-w-44 self-center">
          <Search className="size-4" />
          Filtrar resultados
        </Button>
      </div>
    </form>
  );
};

export { TeamsFilters };
