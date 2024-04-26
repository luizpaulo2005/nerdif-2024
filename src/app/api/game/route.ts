import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const getGames = async (req: Request) => {
    const select = await prisma.game.findMany();

    if (select) {
      return NextResponse.json(select, { status: 200 });
    } else {
      return NextResponse.json({ message: "No games found" }, { status: 404 });
    }
  }

export { getGames as GET };