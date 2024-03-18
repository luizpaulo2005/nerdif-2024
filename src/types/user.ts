import { Team } from "@/types/team";

export interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: string;

    createdAt: string;
    updatedAt: string;
    Team: Team[];
}