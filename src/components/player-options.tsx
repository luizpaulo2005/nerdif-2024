import { Check, Undo2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Submission } from "@/types/submission";

interface PlayerOptionsProps {
    player: Submission;
}

const PlayerOptions = (props: PlayerOptionsProps) => {
    const { player } = props;

    return (
        <div className="flex items-center gap-2">
            <Button className="bg-green-500 hover:bg-green-400 transition-colors" size="icon" disabled={player.status !== "pending"}>
                <Check />
            </Button>
            <Button className="bg-red-500 hover:bg-red-400 transition-colors" size="icon" disabled={player.status !== "pending"}>
                <X />
            </Button>
            <Button size="icon" disabled={player.status === "pending"}>
                <Undo2 />
            </Button>
        </div>
    )
}

export { PlayerOptions }