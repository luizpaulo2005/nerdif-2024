import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userSubmissions = async (req: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session.user?.email },
    });

    if (user) {
      const submissions = await prisma.submission.findMany({
        where: { userId: user.id },
      });

      return NextResponse.json(submissions, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
};

const createSubmissionSchema = z.object({
  teamId: z.string(),
});

const createSubmission = async (req: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session.user?.email },
      include: { Team: true, Submission: true },
    });

    if (user) {
      // @ts-ignore
      if (user.Team || user.Submission) {
        return NextResponse.json(
          { message: "User already has a team or submission" },
          { status: 400 }
        );
      } else {
        const { teamId } = createSubmissionSchema.parse(
          await req.json()
        );

        const submission = await prisma.submission.create({
          data: {
            teamId,
            userId: user.id,
          },
        });

        if (submission) {
          return NextResponse.json(submission, { status: 200 });
        } else {
          return NextResponse.json(
            { message: "Error creating submission" },
            { status: 500 }
          );
        }
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
};

export { userSubmissions as GET, createSubmission as POST };
