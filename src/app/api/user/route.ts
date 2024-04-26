import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const actualUser = async (req: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session.user.email },
      include: {
        Team: true
      }
    });

    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};

export { actualUser as GET };
