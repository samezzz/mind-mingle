import { PrismaAdapter } from "@next-auth/prisma-adapter";
import sendMail, { sendMarketingMail } from "@/app/emails";
import WelcomeEmail from "@/app/emails/WelcomeEmail";
import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import prisma from "@/lib/prisma";
import { isBlacklistedEmail } from "@/lib/utils";
import LoginLink from "@/app/emails/LoginLink";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      sendVerificationRequest({ identifier, url }) {
        sendMail({
          subject: "Your Dub.sh Login Link",
          to: identifier,
          component: <LoginLink url={url} />,
        });
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? ".dub.sh" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (!user.email || (await isBlacklistedEmail(user.email))) {
        return false;
      }
      return true;
    },
    jwt: async ({ token, account }) => {
      if (!token.email || (await isBlacklistedEmail(token.email))) {
        return {};
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        // @ts-ignore
        id: token.sub,
        ...session.user,
      };
      return session;
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const email = message.user.email as string;
        await sendMarketingMail({
          subject: "✨ Welcome to Dub",
          to: email,
          component: <WelcomeEmail />,
        });
      }
    },
  },
};

export default NextAuth(authOptions);
