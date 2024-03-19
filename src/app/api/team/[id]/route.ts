import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const deleteTeam = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession({ req, ...authOptions });
  const { id } = params;

  if (session) {
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session?.user?.email },
    });

    if (user) {
      try {
        await prisma.team.delete({
          where: { id, ownerId: user.id },
        });

        return NextResponse.json({ message: "Team deleted" }, { status: 200 });
      } catch (err) {
        return NextResponse.json(
          { message: "Error deleting team" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};

export { deleteTeam as DELETE }