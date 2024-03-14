import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  secret: env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google" && profile.email_verified) {
        const select = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!select) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              imageUrl: profile.picture,
            },
          });
        }
      }

      return true;
    },
  },
};

export { authOptions };
