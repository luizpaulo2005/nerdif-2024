import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const status = ["pending", "rejected", "accepted"] as const;

const submissionSchema = z.enum(status);

const changeSubmissionStatus = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await getServerSession({ req, ...authOptions });
  if (session) {
    const { id } = params;
    const status = submissionSchema.parse(
      req.nextUrl.searchParams.get("status")
    );

    const submission = await prisma.submission.findUnique({
      where: { id },
    });

    if (submission) {
      await prisma.submission.update({
        where: { id },
        data: { status },
      });

      return NextResponse.json(status, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Submission not found" },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
};

const leaveTeam = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const { id } = params;
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { email: session.user?.email },
      include: {
        Team: true,
        Submission: true,
      },
    });

    if (user) {
      const submission = await prisma.submission.findUnique({
        where: { id, userId: user.id },
      });

      if (submission) {
        const removeSubmission = await prisma.submission.delete({
          where: { id: submission.id, userId: user.id },
        })

        if (removeSubmission) {
          return NextResponse.json({ message: "Submission removed" }, { status: 200 });
        } else {
          return NextResponse.json({ message: "Error removing submission" }, { status: 500 });
        }
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
};

export { changeSubmissionStatus as PATCH, leaveTeam as DELETE };
