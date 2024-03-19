import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const getGames = async (req: Request) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const select = await prisma.game.findMany();

    if (select) {
      return NextResponse.json(select, { status: 200 });
    } else {
      return NextResponse.json({ message: "No games found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
};

export { getGames as GET };