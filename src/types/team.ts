import { User } from "@/types/user";
import { Game } from "@/types/game";
import { Submission } from "@/types/submission";

export interface Team {
  id: string;
  name: string;
  gameId: Game["id"];
  ownerId: User["id"];

  owner: User;
  game: Game;

  createdAt: string;
  updatedAt: string;

  players: Submission[]
}
