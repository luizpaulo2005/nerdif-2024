import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const getTeams = async (req: Request) => {
  const select = await prisma.team.findMany({
    include: {
      game: true,
      owner: true,
      players: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "asc",
        }
      },
    },
  });

  if (select) {
    return NextResponse.json(select, { status: 200 });
  } else {
    return NextResponse.json({ message: "No teams found" }, { status: 404 });
  }
};

const CreateTeamSchema = z.object({
  name: z.string(),
  gameId: z.string(),
  ownerId: z.string(),
});

const createTeam = async (req: Request) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session.user?.email },
    });

    const { name, ownerId, gameId } = CreateTeamSchema.parse(await req.json());

    const team = await prisma.team.create({
      // @ts-ignore
      data: {
        name,
        gameId,
        ownerId: user?.id,
      },
    });

    if (team) {
      const submission = await prisma.submission.create({
        // @ts-ignore
        data: {
          status: "accepted",
          teamId: team.id,
          userId: user?.id,
        },
      });

      if (submission) {
        return NextResponse.json(team, { status: 201 });
      } else {
        return NextResponse.json(
          { message: "Error creating team" },
          { status: 500 }
        );
      }
    }
  } else {
    return NextResponse.json("Unauthenticated", { status: 401 });
  }
};

export { getTeams as GET, createTeam as POST };
