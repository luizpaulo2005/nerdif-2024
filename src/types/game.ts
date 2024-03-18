import { Team } from "@/types/team";

export interface Game {
  id: string;
  name: "League of Legends" | "Valorant" | "Xadrez" | "Counter Strike" | "Free Fire";
  imageUrl: string;
  Team: Team[];

  createdAt: string;
  updatedAt: string;
}
