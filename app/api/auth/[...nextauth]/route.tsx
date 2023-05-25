import { PrismaAdapter } from "@next-auth/prisma-adapter";
import sendMail, { sendMarketingMail } from "@/app/emails";
import LoginLink from "@/app/emails/LoginLink";
import WelcomeEmail from "@/app/emails/WelcomeEmail";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/email";
import prisma from "@/lib/prisma";
import { isBlacklistedEmail } from "@/lib/utils";

const HOST_DEPLOYMENT = !!process.env.HOST_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      sendVerificationRequest({ identifier, url }) {
        sendMail({
          subject: "Login Link",
          to: identifier,
          component: <LoginLink url={url} />,
        });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${HOST_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: HOST_DEPLOYMENT ? "localhost:3000" : undefined,
        secure: HOST_DEPLOYMENT,
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
