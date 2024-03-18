import { User } from "@/types/user";
import { Team } from "@/types/team";

export interface Submission {
    id: string;
    status: "pending" | "accepted" | "rejected";

    teamId: Team["id"];
    userId: User["id"];

    team: Team;
    user: User;

    // createdAt: string;
    // updatedAt: string;
}